<template>
  <Loader v-if="loading" noBg />
  <Dialog class="">
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
            :label="$t('categories_page.category_image')"
          />

          <img
            v-if="form.file"
            :src="form.image ? form.image : form.file"
            class="h-52 w-52"
            ref="preview"
          />

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
import { ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import FileInput from '@/components/fileInput.vue'
import { updateOffer } from '@/services/api.js'
import { Edit } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'
import { useOffersStore } from '@/stores/appStore.js'
import { useToast } from '@/components/ui/toast/use-toast'
import Loader from '@/components/Loader.vue'

defineRule('required', required)

const props = defineProps({
  item: { type: Object }
})

const authStore = useAuthStore()
const offersStore = useOffersStore()
const { toast } = useToast()

const schema = {
  title: { required: true },
  price: { required: true },
  product_id: { required: true }
  // image: { required: true }
}

const loading = ref(false)
const form = ref({
  title: props.item.offer_title,
  price: props.item.offer_price,
  file: props.item.offer_image,
  product_id:'',
  image: ''
})

const id = props.item.id

const handelUpdate = (values) => {
  loading.value = true
  updateOffer({ ...values, id: id, token: authStore.token })
    .then((res) => {
      offersStore.getItems(authStore.token)
      if (res.data.success === true) {
        toast({
          title: 'update_data_success',
          success: true,
          duration: 3000
        })
      }
      loading.value = false
    })
    .catch((error) => {
      if (!error.response) {
        toast({
          title: 'network_error',
          error: true,
          duration: 3000
        })
      }
      loading.value = false
    })
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
</script>

<style scoped></style>
