<template>
  <Loader v-if="loading" noBg />
  <Dialog className="">
    <DialogTrigger>
      <Button class="rtl-dir gap-2"> <Plus className=" h-2 w-2" /> {{ $t('add_new') }} </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-2xl">
          {{ $t('notifications_page.add_new') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('notifications_page.add_description') }}
        </DialogDescription>
      </DialogHeader>

      <div class="mt-4 mx-auto w-full">
        <vee-form :validation-schema="schema" @submit="handelAdd" class="space-y-6">
          <BaseInput
            v-model="form.Title"
            :placeholder="$t(`notifications_page.title`)"
            name="title"
            :label="$t(`notifications_page.title`)"
          />

          <FormField :value="form.Notification" v-slot="{ componentField }" name="Notification">
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
          <BaseInput
            v-model="form.user_id"
            :placeholder="$t(`notifications_page.user_id`)"
            name="user_id"
            :label="$t(`notifications_page.user_id`)"
          />

          <DialogFooter class="flex items-end">
            <DialogClose>
              <Button type="submit">
                {{ $t('notifications_page.add_notification') }}
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
import { required, numeric } from '@vee-validate/rules'
import { defineRule } from 'vee-validate'

import { addNotification } from '@/services/api.js'

import { Plus } from 'lucide-vue-next'
import { ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import FileInput from '@/components/fileInput.vue'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationsStore } from '@/stores/appStore'
import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'

defineRule('required', required)
defineRule('numeric', numeric)

const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()
const { toast } = useToast()
const Router = useRouter()

const schema = {
  Notification: { required: true },
  title: { required: true },
  user_id: { required: true, numeric: true }
}

const handelAdd = (values) => {
  console.log(values)

  const token = authStore.token
  loading.value = true
  addNotification({ ...values, token })
    .then((res) => {
      console.log(res)

      loading.value = false
      if (res.data.succNum === 200) {
        notificationsStore.getItems(token)
        toast({
          title: 'add_data_success',
          success: true,
          duration: 3000
        })
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
  title: '',
  Notification: '',
  user_id: ''
})
</script>

<style scoped></style>