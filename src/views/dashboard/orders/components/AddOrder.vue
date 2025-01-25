<template>
  <Loader v-if="loading" noBg />
  <Dialog className="">
    <DialogTrigger>
      <Button class="rtl-dir gap-2"> <Plus className=" h-2 w-2" /> {{ $t('add_new') }} </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-2xl">
          {{ $t('orders_page.add_new') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('orders_page.add_description') }}
        </DialogDescription>
      </DialogHeader>

      <div class="mt-4 mx-auto w-full">
        <vee-form :validation-schema="schema" @submit="handelAdd" class="space-y-6">
          <BaseInput
            :value="form.name"
            v-model="form.name"
            :placeholder="$t(`orders_page.user_name`)"
            name="name"
            :label="$t(`orders_page.user_name`)"
          />
          <BaseInput
            :value="form.name"
            v-model="form.name"
            :placeholder="$t(`orders_page.user_name`)"
            name="name"
            :label="$t(`orders_page.user_name`)"
          />

          <FileInput
            :value="form.image"
            v-model="form.image"
            :onchange="previewFile"
            :label="$t(`orders_page.user_image`)"
          />

          <div v-if="form.image" class="">
            <img :src="form.image" class="h-24 w-24 rounded-full border p-.5 shadow-md bg-border" alt="" />
          </div>

          <DialogFooter class="flex items-end">
            <DialogClose>
              <Button type="submit">
                {{ $t('orders_page.add_order') }}
              </Button>
            </DialogClose>
          </DialogFooter>
        </vee-form>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
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
import { required } from '@vee-validate/rules'
import { defineRule } from 'vee-validate'

import { addCategory, getCategories } from '@/services/api.js'

import { Plus } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import FileInput from '@/components/fileInput.vue'
import { useAuthStore } from '@/stores/authStore'
import { useCategoriesStore } from '@/stores/categoriesStore'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'

defineRule('required', required)

const authStore = useAuthStore()
const categoriesStore = useCategoriesStore()
const { toast } = useToast()
const Router = useRouter()

const schema = {
  name: { required: true },
  image: { required: true }
}

function previewFile() {
  var preview = document.querySelector('img')
  var file = document.querySelector('input[type=file]').files[0]
  var reader = new FileReader()

  reader.onloadend = function () {
    form.value.image = reader.result
  }

  if (file) {
    reader.readAsDataURL(file)
    console.log(reader)
  } else {
    preview.src = ''
  }
}

const handelAdd = (values) => {
  const token = authStore.token
  loading.value = true
  addCategory({ ...values, token })
    .then((res) => {
      loading.value = false
      if (res.data.succNum === 200) {
        Router.push('/dashboard/categories')
        categoriesStore.getItems()
        toast({
          title: 'add_data_success',
          success: true,
          duration: 3000
        })
      }
    })
    .catch((error) => {
      loading.value = false
      if (!error.response) {
        toast({
          title: 'network_error',
          error: true,
          duration: 3000
        })
      }
    })
}

const loading = ref(false)
const form = ref({
  name: '',
  file: '',
  image: ''
})
</script>

<style scoped></style>
