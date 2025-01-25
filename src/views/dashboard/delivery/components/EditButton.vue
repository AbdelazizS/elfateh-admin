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
import { useAuthStore } from '@/stores/authStore'
import { useDeliveryStore } from '@/stores/categoriesStore'
import { updateDeliveryBoy } from '@/services/api.js'

const props = defineProps({
  item: { type: Object }
})

defineRule('required', required)
defineRule('min', min)

const schema = {
  name: { required: true },
  note: { required: true },
  transportation_type: { required: true },
  email: { required: true }
}

const { toast } = useToast()

const deliveryStore = useDeliveryStore()
const authStore = useAuthStore()
const Loading = ref(false)
const form = ref({
  name: props.item.Name,
  transportation_type: props.item.Transportation_type,
  note: props.item.Note,
  image: props.item.Image,
  email: `${0}${props.item.Phone}`
})

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

const handelUpdate = (values) => {
  // Loading.value = true

  const token = authStore.token
  const id = props.item.ID
  console.log(id, props.item, 'props.itm')

  updateDeliveryBoy({ ...values, id, token })
    .then((res) => {
      console.log(res)

      // Loading.value = false
      deliveryStore.getItems()
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
</script>
