<script setup>
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
// import { UserAuthForm } from '@/components/user-auth-form'
import { useAuthStore } from '@/stores/authStore'
import { register } from '@/services/api'
import Loader from '@/components/Loader.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import BaseInput from '@/components/BaseInput.vue'
import { defineRule } from 'vee-validate'
import { useToast } from '@/components/ui/toast/use-toast'
import { required, regex, alpha_spaces, email, min, max, confirmed } from '@vee-validate/rules'

defineRule('required', required)
defineRule('regex', regex)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('alpha_spaces', alpha_spaces)
defineRule('confirmed', confirmed)

const strongPassword = '(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[^A-Za-z0-9])(?=.{8,35})'

onBeforeMount(() => {
  if (authStore.isAuthenticated) {
    router.push('/')
  }

  form.value.email = router.options.history.state.email
})

const loading = ref(false)
const emailUsed = ref('')
const router = useRouter()
const { toast } = useToast()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  terms: null,
  password: '',
  password_Confirmation: ''
})
const schema = {
  name: { required: true, alpha_spaces: true, min: 3 },
  email: { required: true, email: true },
  // terms: { required: true },
  password: { required: true, min: 8, regex: strongPassword },
  password_Confirmation: { required: true, confirmed: '@password' }
}

const onSubmit = async (values) => {
  loading.value = true
  register(values)
    .then((response) => {
      if (response.data.status === true) {
        toast({
          title: 'auth.register_success',
          success: true,
          duration: 3000
        })

        setTimeout(() => {
          toast({
            title: 'auth.redirect_to_verify',
            success: true,
            duration: 3000
          })
          router.push({ name: 'verify', state: { email: values.email } })
        }, 1500)

      }
    })
    .catch((error) => {
      if (error.response.status === 422) {
        emailUsed.value = 'emailUsed'
      }
      if (!error.response) {
        toast({
          title: 'network_error',
          // success: true,
          duration: 3000
        })
      }
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 1500)
      setTimeout(() => {
        emailUsed.value = ''
      }, 3500)
      // clearTimeout(timer)
    })
}
</script>

<template>
  <Loader v-if="loading" />

  <div
    className="relative grid h-dvh flex-col items-center md:justify-center lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
      <div
        className="absolute inset-0  bg-gradient-to-br from-primary/60 via-primary/40 to-primary/10 "
      />
      <div className="relative z-20 flex items-center  font-medium">
        <h2 class="text-2xl text-bold">
          {{ $t('dashboard') }}
        </h2>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute start-52 top-48 h-8 w-16 rounded-xl text-primary"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
          clip-rule="evenodd"
        />
      </svg>
      <img src="../../assets/images/logo.png" className="relative m-auto w-60" alt="Vite" />

      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <footer className="text-sm">2024 EtooPlay &copy;</footer>
        </blockquote>
      </div>
    </div>
    <div className="lg:p-8">
      <div class="flex flex-col justify-center py-8 mb-8">
        <div class="text-center">
          <img src="../../assets/images/logo.png" class="fade-up mx-auto h-auto w-28" />
          <div class="mt-5 space-y-2">
            <h3 class="fade-up text-foreground text-2xl font-bold md:text-3xl">
              {{ $t('auth.login_title') }}
            </h3>
            <p class="text-muted-foreground fade-up">
              {{ $t('auth.havenot_account') }}
              <RouterLink
                to="/auth/login"
                href="javascript:void(0)"
                class="font-medium text-primary hover:text-primary hover:underline"
                >{{ $t('sign_in') }}
              </RouterLink>
            </p>
          </div>
        </div>
        <div class="mt-6 mx-auto w-full max-w-sm">
          <vee-form :validation-schema="schema" @submit="onSubmit" class="space-y-5">
            <BaseInput
              :placeholder="$t('auth.name_placeholder')"
              name="name"
              class="fade-up"
              v-model="form.name"
              :label="$t('auth.name')"
            />
            <div class="">
              <BaseInput
                class="fade-up"
                autocomplete="email"
                placeholder="e.g@example.com"
                name="email"
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

            <PasswordInput
              :placeholder="$t('auth.password_placeholder')"
              name="password"
              class="fade-up"
              v-model="form.password"
              :label="$t('auth.password')"
            />

            <PasswordInput
              class="fade-up"
              :placeholder="$t('auth.passwordConfirm_placeholder')"
              name="password_Confirmation"
              v-model="form.password"
              :label="$t('auth.confirm_password')"
            />

            <Button class="fade-up w-full">{{ $t('sign_up') }}</Button>
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>
