<template>
  <Loader v-if="loading" noBg />
  <Dialog className="">
    <DialogTrigger>
      <Button class="rtl-dir gap-2"> <Plus className=" h-2 w-2" /> {{ $t('add_new') }} </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-2xl">
          {{ $t('offers_page.add_new') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('offers_page.add_description') }}
        </DialogDescription>
      </DialogHeader>

      <div class="mt-4 mx-auto w-full">
        <vee-form :validation-schema="schema" @submit="handelAdd" class="space-y-6">

         <BaseInput
            :value="form.product_id"
            v-model="form.product_id"
            :placeholder="$t(`product_id`)"
            name="product_id"
            type="number"
            :label="$t(`product_id`)"
          />
          <BaseInput
            :value="form.price"
            v-model="form.price"
            :placeholder="$t(`offers_page.offer_price`)"
            name="price"
            type="number"
            :label="$t(`offers_page.offer_price`)"
          />

          <BaseInput
            :value="form.title"
            v-model="form.title"
            :placeholder="$t(`offers_page.offer_name`)"
            name="title"
            type="text"
            :label="$t(`offers_page.offer_name`)"
          />

          <FileInput
            :value="form.image"
            v-model="form.image"
            @change="previewFile"
            :label="$t(`banners_page.banner_image`)"
          />

          <div v-if="form.image" class="">
            <img ref="preview" :src="form.image" class="h-52 w-52" alt="" />
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
import { addOffer } from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import { useOffersStore } from '@/stores/appStore.js'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'

defineRule('required', required)

const authStore = useAuthStore()
const offersStore = useOffersStore()
const { toast } = useToast()
const Router = useRouter()

const schema = {
  // name: { required: true },
  title: { required: true },
  price: { required: true },
  image: { required: true },
  product_id: { required: true }
}

const preview = ref(null)

function previewFile(event) {
  const previewElement = preview.value
  const file = event.target.files[0]
  const reader = new FileReader()

  reader.onloadend = () => {
    form.value.image = reader.result
  }

  if (file) {
    reader.readAsDataURL(file)
  } else {
    previewElement.src = ''
  }
}

const handelAdd = (values) => {
  const token = authStore.token
  loading.value = true
  addOffer({ ...values, token })
    .then((res) => {
      offersStore.getItems(authStore.token)
      if (res.status === 200) {
        toast({
          title: 'add_data_success',
          success: true,
          duration: 3000
        })
      }
      loading.value = false
    })
    .catch((err) => {
      if (!err.response) {
        toast({
          title: 'network_error',
          error: true,
          duration: 3000
        })
      }

      loading.value = false
    })
}

const loading = ref(false)
const form = ref({
  name: '',
  file: '',
  image: '',
  title: '',
  price: ''
})
</script>

<style scoped></style>
