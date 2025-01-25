<template>
  <Loader noBg v-if="Loading"/>
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
          <BaseInput
            :value="form.name"
            v-model="form.name"
            :placeholder="$t('product_name')"
            name="name"
            :label="$t('product_name')"
          />

          <BaseInput
            :value="form.description"
            v-model="form.description"
            :placeholder="$t('product_description')"
            name="description"
            :label="$t('product_description')"
          />

          <FileInput />

          <!-- <BaseInput
            :value="form.image"
            v-model="form.image"
            :placeholder="`product image`"
            name="image"
            type="file"
            :label="'product_image'"
          /> -->

          <DialogFooter class="flex items-end">
            <!-- <DialogClose> -->
            <Button type="submit">
              {{ $t('save_changes') }}
            </Button>
            <!-- </DialogClose> -->
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
} from '@/components/ui/dialog'

import { required, min } from '@vee-validate/rules'
import { Edit } from 'lucide-vue-next'
import { defineRule } from 'vee-validate'
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import Loader from '@/components/Loader.vue'

const props = defineProps({
  item: { type: Object }
})

defineRule('required', required)
defineRule('min', min)

const schema = {
  name: { required: true },
  image: { required: true },
  description: { required: true, min: 4 }
}

const { toast } = useToast()

const Loading = ref(false)
const form = ref({
  name: props.item.id,
  description: props.item.id,
  image: props.item.image
})

const handelUpdate = (values) => {

  Loading.value = true
  toast({
    title: 'update_data_success',
    success: true,
    duration: 3000
  })

  // if (!error.response) {
  //   toast({
  //     title: 'network_error',
  //     error: true,
  //     duration: 3000
  //   })
  // }
}
</script>
