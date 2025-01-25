<template>
  <Loader v-if="loading" noBg />
  <Dialog className="">
    <DialogTrigger>
      <Button class="rtl-dir gap-2"> <Plus className=" h-2 w-2" /> {{ $t('add_new') }} </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-2xl">
          {{ $t('delivery_page.add_new') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('delivery_page.add_description') }}
        </DialogDescription>
      </DialogHeader>

      <div class="mt-4 mx-auto w-full">
        <vee-form :validation-schema="schema" @submit="handelAdd" class="space-y-6">
          <div class="flex items-center gap-2">
          <BaseInput
            :value="form.name"
            class="w-1/2"
            v-model="form.name"
            :placeholder="$t(`delivery_page.user_name`)"
            name="name"
            :label="$t(`delivery_page.user_name`)"
          />
          <BaseInput
            :value="form.email"
            class="w-1/2"
            v-model="form.email"
            :placeholder="$t(`delivery_page.eamil`)"
            name="email"
            :label="$t(`delivery_page.eamil`)"
          />
        </div>

          <div class="flex items-center gap-2">
            <BaseInput
              :value="form.transportation_type"
              v-model="form.transportation_type"
              class="w-1/2"
              :placeholder="$t(`delivery_page.transportation_type`)"
              name="transportation_type"
              :label="$t(`delivery_page.transportation_type`)"
            />

            <BaseInput
              :value="form.note"
              class="w-1/2"
              v-model="form.note"
              :placeholder="$t(`delivery_page.note`)"
              name="note"
              :label="$t(`delivery_page.note`)"
            />
          </div>

          <FileInput
            :value="form.image"
            v-model="form.image"
            
            :onchange="previewFile"
            :label="$t(`delivery_page.user_image`)"
          />

          <div v-if="form.image" class="">
          <img
            :src="form.image"
            class="h-16 w-16 rounded-full border p-.5 shadow-md bg-border"
            alt=""
          />
          </div>

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

import { addDeliveryBoy } from '@/services/api.js'

import { Plus } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import FileInput from '@/components/fileInput.vue'
import { useAuthStore } from '@/stores/authStore'
import { useDeliveryStore } from '@/stores/categoriesStore'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'

defineRule('required', required)

const authStore = useAuthStore()
const deliveryStore = useDeliveryStore()
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
    console.log(reader)
  } else {
    preview.src = ''
  }
}

const handelAdd = (values) => {
  const token = authStore.token
  loading.value = true
  addDeliveryBoy({ ...values, token })
    .then((res) => {
      console.log(res);
      
      loading.value = false
      if (res.data.succNum === 200) {
        deliveryStore.getItems()
        toast({
          title: 'add_data_success',
          success: true,
          duration: 3000
        })
      }
    })
    .catch((error) => {
      console.log(error);
      
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
  transportation_type: '',
  note: '',
  email: '',
})



</script>

<style scoped></style>
