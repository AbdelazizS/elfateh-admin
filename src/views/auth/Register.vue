<script setup>
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
// import { UserAuthForm } from '@/components/user-auth-form'
import { useAuthStore } from '@/stores/authStore'
import Loader from '@/components/Loader.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import BaseInput from '@/components/BaseInput.vue'
import { defineRule } from 'vee-validate'
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
  console.log(router)
})

const loading = ref(false)
const router = useRouter()
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
  const formData = new FormData()
  formData.append('client_name', values.name)
  formData.append('email', values.email)
  formData.append('password', values.password)
  formData.append('c_password', values.password_Confirmation)
  formData.append('app_id', 199)
  formData.append('term_of_service', 1)

  loading.value = true

  axios
    .post('https://api.etoolabs.com/v3/public/cpanel/register', formData)
    .then((resp) => {
      resolve(resp.data)
    })
    .catch((error) => {
      console.log(error)
    })

  console.log(values)
  // register(formData)
  //   .then((response) => {
  //     console.log(response)
  //     if (response.success === true) {
  //       toast({
  //         title: 'auth.register_success',
  //         success: true,
  //         duration: 3000
  //       })

  //       setTimeout(() => {
  //         toast({
  //           title: 'auth.redirect_to_verify',
  //           success: true,
  //           duration: 3000
  //         })
  //         router.push({ name: 'verify', state: { email: values.email } })
  //       }, 1500)

  //       console.log(response)
  //     } else if (response.status === false) {
  //       if (response.errNum === 'E011') {
  //         console.log(response)
  //         emailUsed.value = 'emailUsed'
  //       }
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //     if (!error.response) {
  //       toast({
  //         title: 'network_error',
  //         // success: true,
  //         duration: 3000
  //       })
  //     }
  //   })
  //   .finally(() => {
  //     setTimeout(() => {
  //       loading.value = false
  //     }, 1500)
  //     setTimeout(() => {
  //       emailUsed.value = ''
  //     }, 3500)
  //     // clearTimeout(timer)
  //     console.log('eeee')
  //   })
}
</script>

<template>
  <Loader v-if="loading" />
  <div
    className="container relative grid h-dvh flex-col items-center md:justify-center lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
      <div className="absolute inset-0 bg-primary/10 " />
      <div className="relative z-20 flex items-center  font-medium">
        <h2
          class="text-2xl text-gradient bg-gradient-to-r from-primary to-black/60 bg-clip-text text-transparent"
        >
          Elfateh Admin
        </h2>
      </div>

      <img src="../../assets/images/logo.png" className="relative m-auto w-60" alt="Vite" />

      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            This product Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ea animi quas
            minima eum laudantium ullam
          </p>
          <footer className="text-sm">&copy; 2024 EtooPlay</footer>
        </blockquote>
      </div>
    </div>
    <div className="lg:p-8">
      <div class="flex flex-col justify-center py-8 mb-8">
        <div class="text-center">
          <img src="../../assets/images/logo.png" class="fade-up mx-auto h-24 w-24" />
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
                >{{ $t('home.nav.sign_up') }}
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

            <Button class="fade-up w-full">{{ $t('home.nav.sign_up') }}</Button>
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>
