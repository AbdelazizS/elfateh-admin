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
            :value="form.name"
            v-model="form.name"
            :placeholder="$t(`offers_page.offer_name`)"
            name="name"
            :label="$t(`offers_page.offer_name`)"
          />

          <BaseInput
            :value="form.description"
            v-model="form.description"
            :placeholder="$t(`offers_page.offer_description`)"
            name="description"
            :label="$t(`offers_page.offer_description`)"
          />

          <div class='flex items-center gap-4'>
            <BaseInput
            class='w-full'
            :value="form.product_name"
            v-model="form.product_name"
            :placeholder="$t(`offers_page.product_name`)"
            name="product_name"
            :label="$t(`offers_page.product_name`)"
          />


          <BaseInput
            class='w-full'
            :value="form.percent"
            :type='`number`'
            v-model="form.percent"
            :placeholder="$t(`offers_page.offer_percent`)"
            name="percent"
            :label="$t(`offers_page.offer_percent`)"
          />
          </div>

          <FileInput
            :value="form.image"
            v-model="form.image"
            :onchange="previewFile"
            :label="$t(`offers_page.offer_image`)"
          />

          <div v-if="form.image" class="">
            <img :src="form.image" class="h-24 w-24" alt="" />
          </div>

          <DialogFooter class="flex items-end">
            <DialogClose>
              <Button type="submit">
                {{ $t('offers_page.add_offer') }}
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
import { useAuthStore } from '@/stores/authStore'
import { useCategoriesStore } from '@/stores/appStore.js'
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

const handelAdd = (values) => {
  const token = authStore.token
  loading.value = true
  addCategory({ ...values, token })
    .then((res) => {
      loading.value = false
      if (res.data.succNum === 200) {
        Router.push('/dashboard/categories')
        categoriesStore.getItems(authStore.token)
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
  description: '',
  file: '',
  image: ''
})
</script>

<style scoped></style>
