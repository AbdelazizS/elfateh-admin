<template>
  

 
  <div class="heroBg Verify">
    <div class="py-16 md:py-24">
        <div class="flex flex-col">
          <div class="text-center">
            <img src="../../assets/images/logo.png" class="fade-up mx-auto h-24 w-24" />
            <div class="mt-5 space-y-2">
              <h3 class="fade-up text-foreground text-2xl font-bold md:text-3xl">
                {{ $t('verify_your_email') }}
              </h3>
              <p class="fade-up text-muted-foreground w-full md:max-w-lg mx-auto">
                We are glad, that you’re with us ? We’ve sent you a verification link to the email
                address
                <span class="font-medium text-indigo-500">{{ email.value }}</span>
              </p>
            </div>
          </div>
          <div class="mt-4 mx-auto max-md:w-full max-w-sm">
            <span
              v-if="unValidCode"
              :class="unValidCode ? 'block' : 'hidden'"
              class="text-red-500 mb-2 flex justify-center transition-all ease-in-out duration-300 delay-150"
            >
              {{ $t(`auth.${unValidCode}`) }}
            </span>

            <vee-form
              v-if="!hideInput"
              @submit="onSubmit"
              class="flex flex-col md:flex-row items-center max-md:space-y-2 gap-4 text-center"
            >
              <PinInput class="fade-up" id="pin-input" v-model="form.otp_number" placeholder="○">
                <PinInputGroup>
                  <PinInputInput v-for="(id, index) in 4" :key="id" :index="index" />
                </PinInputGroup>
              </PinInput>
              <Button class="fade-up max-md:w-4/5">
                {{ $t('submit') }}
              </Button>
            </vee-form>

            <div class="fade-up flex justify-center">
              <Button
                v-if="hideInput"
                @click="handleShow"
                :class="`${hideInput ? 'w-60 md:w-64' : ''}`"
              >
                {{ $t('submit') }}</Button
              >
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import Loader from '@/components/Loader.vue'
// import BaseInput from '@/components/BaseInput.vue'
import { PinInput, PinInputGroup, PinInputInput } from '@/components/ui/pin-input'
import { defineRule } from 'vee-validate'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { email, required } from '@vee-validate/rules'
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import { verify } from '@/services/api.js'
import { useToast } from '@/components/ui/toast/use-toast'


defineRule('required', required)
onBeforeMount(() => {
  email.value = router.options.history.state.email
})

const hideInput = ref(true)
const loading = ref(false)
const unValidCode = ref('')

const handleShow = () => {
  hideInput.value = false
}
const form = ref({
  email: '',
  otp_number: []
})

const timer = (time) => {
  setTimeout((time) => {
    unValidCode.value = ''
  }, time)
}

const router = useRouter()
const { toast } = useToast()

// verify('verify', {
//   email: 'abdelazizelrasheed@gmail.com'
// }).then((response) => {
//   console.log(response)
// })
const onSubmit = () => {
  if (form.value.otp_number.length === 4) {
    const otp_number = form.value.otp_number.join('')
    const formData = new FormData()
    formData.append('code', otp_number)
    formData.append('email', email.value)
    loading.value = true

    verify('verify', formData)
      .then((response) => {
        console.log(response)
        if (response.status === true) {
          toast({
            title: 'auth.verified_success',
            success: true,
            duration: 3000
          })

          setTimeout(() => {
            toast({
              title: 'auth.redirect_to_login',
              success: true,
              duration: 3000
            })
            router.push({ name: 'login', state: { email: email.value } })
          }, 1500)

          console.log(response)
        } else if (response.status === false) {
          if (response.errNum === 0) {
            if (response.msg === 'This code is expired') {
              unValidCode.value = 'codeExpired'
            } else {
              unValidCode.value = 'unValidCode'
            }
          }
        }
      })
      .catch((error) => {
        console.log(error)
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
        form.value.otp_number.value = []
        timer(3500)
        console.log('eeee')
      })
  }
}
</script>
