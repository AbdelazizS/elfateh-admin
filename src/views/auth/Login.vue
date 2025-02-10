<script setup>
// import axios from 'axios'
import { Button } from '@/components/ui/button'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
// import { UserAuthForm } from '@/components/user-auth-form'
import { useAuthStore } from '@/stores/authStore'
import Loader from '@/components/Loader.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import BaseInput from '@/components/BaseInput.vue'
import { defineRule } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { useToast } from '@/components/ui/toast/use-toast'

defineRule('required', required)
defineRule('email', email)

onBeforeMount(() => {
  // if (authStore.isAuthenticated) {
  //   return router.push('/')
  // }

  form.value.email = router.options.history.state.email
})

const loading = ref(false)
const { toast } = useToast()
const router = useRouter()
const authStore = useAuthStore()
const schema = {
  email: { required: true, email: true },
  password: { required: true, min: 8 }
}

const errorMsg = ref('')

const form = ref({
  email: '',
  password: ''
})

const onSubmit = (values) => {
  loading.value = true

  authStore
    .login(values)
    .then((response) => {
      if (response.data.user) {
        toast({
          title: 'auth.login_success',
          success: true,
          duration: 3000
        })
        setTimeout(() => {
          toast({
            title: 'auth.redirect_to_home',
            success: true,
            duration: 3000
          })
          window.location.href = '/'
        }, 1200)
      }
      if (response.data.errNum === 'E001') {
        errorMsg.value = 'email_or_password_error'
      }
      if (response.data.errNum === 'E002') {
        errorMsg.value = 'verify_your_email'
      }
      console.log(response)
    })
    .catch((error) => {
      loading.value = false
      console.log(error)

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
        loading.value = false
      }, 1100)
      setTimeout(() => {
        errorMsg.value = ''
      }, 3500)
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
          <footer className="text-sm">{{new Date().getFullYear()}} EtooPlay &copy;</footer>
        </blockquote>
      </div>
    </div>
    <div className="lg:p-8">
      <div class="flex flex-col justify-center py-8 mb-8 p-4">
        <div class="text-center">
          <img src="../../assets/images/logo.png" class="fade-up mx-auto h-auto w-28" />
          <div class="mt-5 space-y-2">
            <h3 class="fade-up text-foreground text-2xl font-bold md:text-3xl">
              {{ $t('auth.login_title') }}
            </h3>
            <p class="text-muted-foreground fade-up">
              {{ $t('auth.havenot_account') }}
              <RouterLink
                to="/auth/register"
                href="javascript:void(0)"
                class="font-medium text-primary hover:text-primary hover:underline"
                >{{ $t('sign_up') }}
              </RouterLink>
            </p>
          </div>
        </div>
        <div class="mt-6 mx-auto w-full max-w-sm">
          <vee-form :validation-schema="schema" @submit="onSubmit" class="space-y-6">
            <BaseInput
              class="fade-up"
              :value="form.email"
              v-model="form.email"
              placeholder="e.g@example.com"
              name="email"
              :label="$t('auth.email')"
            />

            <div class="">
              <PasswordInput
                :placeholder="$t('auth.password_placeholder')"
                class="fade-up"
                name="password"
                v-model="form.password"
                :label="$t('auth.password')"
              />
              <span
                v-if="errorMsg"
                :class="errorMsg ? 'block' : 'hidden'"
                class="text-center mt-2 text-red-500 px-1 transition-all duration-300"
                >{{ $t(`auth.${errorMsg}`) }}</span
              >
            </div>
            <div class="flex flex-wrap items-center justify-between gap-4">
              <!-- <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label for="remember-me" class="ml-3 block text-sm text-gray-800">
                    {{ $t('auth.remember_me') }}
                  </label>
                </div> -->
              <div class="text-sm fade-up">
                <RouterLink
                  to="/auth/forgot-password"
                  class="text-blue-600 hover:underline font-semibold"
                >
                  {{ $t('auth.forgot_password') }}
                </RouterLink>
              </div>
            </div>
            <Button class="fade-up w-full">{{ $t('sign_in') }}</Button>
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>
