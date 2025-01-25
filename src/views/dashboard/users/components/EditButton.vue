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
            :placeholder="$t('auth.name_placeholder')"
            name="name"
            :value="form.name"
            v-model="form.name"
            :label="$t('auth.name')"
          />
          <div class="">
            <BaseInput
              autocomplete="email"
              placeholder="e.g@example.com"
              name="email"
               :value="form.email"
              v-model="form.email"
              :label="$t('auth.email')"
            />

            <span
              v-if="emailUsed"
              :class="emailUsed ? 'block' : 'hidden'"
              class="text-red-500 px-1 transition-all duration-300"
              >{{ $t(`auth.${emailUsed}`) }}</span
            >
          </div>

          <BaseInput
            placeholder="+2----"
            name="phone"
            v-model="form.phone"
            :label="$t('phone')"
          />

          <div class="flex items-baseline gap-2">
            <PasswordInput
              class="w-1/2"
              :placeholder="$t('auth.password_placeholder')"
              name="password"
              v-model="form.password"
              :label="$t('auth.password')"
            />

            <PasswordInput
              class="w-1/2"
              :placeholder="$t('auth.passwordConfirm_placeholder')"
              name="password_confirmation"
              v-model="form.password_confirmation"
              :label="$t('auth.confirm_password')"
            />
          </div>
          <!-- <img v-if="form.image" :src="form.image" class="h-24 w-24" /> -->

          <!-- <Skeleton class="h-24 w-24" /> -->

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

import { required, regex, alpha_spaces, email, min, max, confirmed } from '@vee-validate/rules'
import { Edit } from 'lucide-vue-next'
import { defineRule } from 'vee-validate'
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import Loader from '@/components/Loader.vue'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'
import PasswordInput from '@/components/PasswordInput.vue'

import { useAuthStore } from '@/stores/authStore'
import { useUsersStore } from '@/stores/appStore'
import { updateUser } from '@/services/api.js'

const props = defineProps({
  item: { type: Object }
})

defineRule('required', required)
defineRule('regex', regex)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('alpha_spaces', alpha_spaces)
defineRule('confirmed', confirmed)

const authStore = useAuthStore()
const usersStore = useUsersStore()
const { toast } = useToast()
const loading = ref(false)

const strongPassword = '(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[^A-Za-z0-9])(?=.{8,35})'

const emailUsed = ref()
const form = ref({
  name: props.item.Name,
  email: props.item.Email,
  password: '',
  password_confirmation: ''
  // phone: props.password_confirmation,
})
const schema = {
  name: { required: true, alpha_spaces: true, min: 3 },
  email: { required: true, email: true },
  // terms: { required: true },
  password: { required: true, min: 8, regex: strongPassword },
  password_confirmation: { required: true, confirmed: '@password' }
}

const handelUpdate = (values) => {
  const token = authStore.token
  loading.value = true


  
  updateUser({ ...values, token , id:props.item.ID })
    .then((res) => {
      loading.value = false
      if (res.data.succNum === 200) {
        usersStore.getItems(authStore.token)
        toast({
          title: 'update_data_success',
          success: true,
          duration: 3000
        })
      }
    })
    .catch((error) => {
      console.log(error);
      
      // loading.value = false
      if (error.response.status === 422) {
        emailUsed.value = 'emailUsed'
      }
      if (!error.response) {
        toast({
          title: 'network_error',
          error: true,
          duration: 3000
        })
      }
    })
    .finally(() => {
      setTimeout(() => {
        emailUsed.value = ''
      }, 3500)
    })
}
</script>
@/stores/appStore