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
          <BaseInput
            :value="form.title"
            v-model="form.title"
            :placeholder="$t(`notifications_page.title`)"
            name="title"
            :label="$t(`notifications_page.title`)"
          />

          <FormField
            :value="form.Notification"
            v-model="form.Notification"
            v-slot="{ componentField }"
            name="Notification"
          >
            <FormItem class="">
              <FormLabel>
                {{ $t('notifications_page.description') }}
              </FormLabel>
              <FormControl>
                <Textarea
                  :placeholder="$t(`notifications_page.description`)"
                  class="resize-none outline-0 w-full"
                  v-bind="componentField"
                />
              </FormControl>
              <!-- <FormMessage /> -->
            </FormItem>
          </FormField>

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
import { Button } from '@/components/ui/button'

import Textarea from '@/components/ui/textarea/Textarea.vue'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

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
import { useNotificationsStore } from '@/stores/appStore'
import { updateNotification } from '@/services/api.js'

const props = defineProps({
  item: { type: Object }
})

defineRule('required', required)
defineRule('min', min)

const schema = {
  title: { required: true },
  Notification: { required: true }
}

const { toast } = useToast()

const notificationsStore = useNotificationsStore()
const authStore = useAuthStore()
const Loading = ref(false)
const form = ref({
  title: props.item.Title,
  Notification: props.item.Notification
})

const handelUpdate = (values) => {
  // Loading.value = true

  const token = authStore.token
  const id = props.item.ID
  console.log(id, props.item)

  updateNotification({ ...values, id, token })
    .then((res) => {
      console.log(res)

      // Loading.value = false
      notificationsStore.getItems(token)
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

  // if (!error.response) {
  //   toast({
  //     title: 'network_error',
  //     error: true,
  //     duration: 3000
  //   })
  // }
}
</script>