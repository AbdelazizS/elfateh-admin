<template>
  <Loader noBg v-if="Loading" />
  <Dialog class="m-2">
    <DialogTrigger>
      <div class="flex items-center font-semibold">
        <Edit class="h-5 me-1" />
        {{ $t('update') }}
      </div>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-2xl">
          {{ $t('update_data') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('update_data_description') }}
        </DialogDescription>
      </DialogHeader>

      <div class="mt-4 mx-auto w-full">
        <vee-form :validation-schema="schema" @submit="handelUpdate" class="space-y-6">
          <!-- <BaseInput
            :value="form.name"
            v-model="form.name"
            :placeholder="$t('categories_page.category_name')"
            name="name"
            :label="$t('categories_page.category_name')"
          /> -->


          <FileInput
            :value="form.image"
            v-model="form.image"
            
            :onchange="previewFile"
            :label="$t(`banners_page.banner_image`)"
          />


          <!-- 
           * 1-from props 
           * 2-stat changes image 
           -->
          <img
            v-if="form.file"
            :src="form.image ? form.image : form.file"
            class="h-24 w-24"
          />

          <!-- <Skeleton class="h-24 w-24" /> -->

          <DialogFooter class="flex items-end">
            <DialogClose>
            <Button type="submit">
              {{ $t('save_changes') }}
            </Button>
            </DialogClose>
          </DialogFooter>
        </vee-form>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import FileInput from '@/components/fileInput.vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'

import { required, min } from '@vee-validate/rules'
import { Edit } from 'lucide-vue-next'
import { defineRule } from 'vee-validate'
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import Loader from '@/components/Loader.vue'
import { useCategoriesStore } from '@/stores/appStore.js'
import { useAuthStore } from '@/stores/authStore'

import { updateCategory } from '@/services/api.js'

const props = defineProps({
  item: { type: Object }
})

defineRule('required', required)
defineRule('min', min)

const schema = {
  name: { required: true },
  // image: { required: true }
}

const { toast } = useToast()

const Loading = ref(false)
const form = ref({
  name: props.item.Category_name,
  file: props.item.Image,
  image: "",
})

const categoriesStore = useCategoriesStore()
const authStore = useAuthStore()

const token = authStore.token
const id = props.item.ID



const handelUpdate = (values) => {  
  form.value.name = values.name

  

  
  
  updateCategory({ ...values, id, token })
    .then((res) => {
      categoriesStore.getItems(authStore.token)
      if (res.data.succNum === 200) {
        toast({
          title: 'update_data_success',
          success: true,
          duration: 3000
        })
      }
    })
    .catch((error) => {
      console.log(error)

      // Loading.value = false
      if (!error.response) {
        toast({
          title: 'network_error',
          error: true,
          duration: 3000
        })
      }
    })
}

function previewFile() {
  const preview = document.querySelector('img')
  const file = document.querySelector('input[type=file]').files[0]
  const reader = new FileReader()

  reader.onloadend = () => {
    form.value.image = reader.result
  }

  if (file) {
    reader.readAsDataURL(file)
  } else {
    preview.src = ''
  }
}
</script>
@/stores/appStore.js