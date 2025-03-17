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
            :value="form.product_id"
            v-model="form.product_id"
            :placeholder="$t(`product_id`)"
            name="product_id"
            type="number"
            :label="$t(`product_id`)"
          /> -->

          <BaseInput
            :value="form.title"
            v-model="form.title"
            :placeholder="$t(`banners_page.banner_title`)"
            name="title"
            type="text"
            :label="$t(`banners_page.banner_title`)"
          />

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
          <img v-if="form.file" :src="form.image ? form.image : form.file" class="h-72 w-72" />

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
import { useBannersStore } from '@/stores/appStore.js'
import { useAuthStore } from '@/stores/authStore'
import { watch } from 'vue'
import { updateBanner } from '@/services/api.js'

const props = defineProps({
  item: { type: Object }
})


watch(() => props.item, (newVal) => {
  form.value.title = newVal.title
  // form.value.product_id = newVal.product_id
  form.value.file = newVal.image
})
defineRule('required', required)
defineRule('min', min)

const schema = {
  title: 'required|min:3',
  // product_id: 'required'
}

const { toast } = useToast()

const Loading = ref(false)
const form = ref({
  title: props.item.title,
  product_id: props.item.product_id,
  file: props.item.image,
  image: ''
})

const bannersStore = useBannersStore();

// const authStore = useAuthStore()
// const token = authStore.token
const id = props.item.id

const handelUpdate = (values) => {

  Loading.value = true

  updateBanner({ ...values, id })
    .then((res) => {
      Loading.value = false
      if(res.data.success === true){
        bannersStore.getItems();
        toast({
          title: 'update_data_success',
          success: true,
          duration: 3000
        })
      }      
    })
    .catch((error) => {
      console.log(error)
      Loading.value = false
      if (!error.response) {
        toast({
          title: 'network_error',
          error: true,
          duration: 3000
        })
      }
    })

  // updateCategory({ ...values, id, token })
  //   .then((res) => {
  //     categoriesStore.getItems(authStore.token)
  //     if (res.data.succNum === 200) {
  //       toast({
  //         title: 'update_data_success',
  //         success: true,
  //         duration: 3000
  //       })
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error)

  //     // Loading.value = false
  //     if (!error.response) {
  //       toast({
  //         title: 'network_error',
  //         error: true,
  //         duration: 3000
  //       })
  //     }
  //   })
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
