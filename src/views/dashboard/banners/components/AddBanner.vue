<template>
  <Loader v-if="loading" noBg />
  <Dialog className="">
    <DialogTrigger>
      <Button class="rtl-dir gap-2"> <Plus className=" h-2 w-2" /> {{ $t('add_new') }} </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-2xl">
          {{ $t('banners_page.add_new') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('banners_page.add_description') }}
        </DialogDescription>
      </DialogHeader>

      <div class="mt-4 mx-auto w-full">
        <vee-form :validation-schema="schema" @submit="handelAdd" class="space-y-6">
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
            @change="previewFile"
            :label="$t(`banners_page.banner_image`)"
          />

          <div v-if="form.image" class="">
            <img :src="form.image" class="h-64 w-64" alt="" />
          </div>

          <DialogFooter class="flex items-end">
            <DialogClose>
              <Button type="submit">
                {{ $t('banners_page.add_banner') }}
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

import { addCategory } from '@/services/api.js'

import { Plus } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import FileInput from '@/components/fileInput.vue'
import { addBanner } from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import { useBannersStore } from '@/stores/appStore.js'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'

defineRule('required', required)

const authStore = useAuthStore()
const bannersStore = useBannersStore()
const { toast } = useToast()
const Router = useRouter()

const schema = {
  // name: { required: true },
  title: { required: true },
  // product_id: { required: true },
  image: { required: true }
}

function previewFile(event) {
  const preview = document.querySelector('img')
  const file = event.target.files[0]
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

const handelAdd = (values) => {
  // const token = authStore.token
  loading.value = true
  addBanner({ ...values })
    .then((res) => {
      bannersStore.getItems()
      loading.value = false
      if (res.data.success === true) {
        toast({
          title: 'add_data_success',
          success: true,
          duration: 3000
        })

        form.value = {
          name: '',
          file: '',
          image: '',
          title: '',
          product_id: ''
        }
      }
    })
    .catch((error) => {
      console.log(error)
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
  image: '',
  title: '',
  product_id: ''
})
</script>

<style scoped></style>
