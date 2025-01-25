<template>
  <Loader v-if="loading" />


  <div class="heroBg ForgotPassword">
    <div class="py-16 md:py-24 mx-auto max-w-7xl p-4">
        <div v-if="!hideSend && hideOtpForm" class="flex flex-col">
          <div class="text-center">
            <img src="../../assets/images/logo.png" class="fade-up mx-auto  h-24 w-24" />
            <div class="mt-5 space-y-2">
              <h3
                class="fade-up text-foreground text-2xl font-bold md:text-3xl"
              >
                {{ $t("auth.forgot_password") }}
              </h3>
              <p
                class="fade-up text-muted-foreground w-full md:max-w-xl mx-auto"
              >
                {{ $t("auth.forgot_password_desc") }}
              </p>
            </div>
          </div>
          <div class="mt-4 mx-auto w-full max-w-sm">
            <vee-form
              :validation-schema="schema"
              @submit="onSend"
              class="flex  flex-col md:flex-row items-center max-md:space-y-2 gap-4 text-center"
            >
              <BaseInput
                :hide_error="true"
                placeholder="e.g@example.com"
                name="email"
                label=""
                class="fade-up w-full"
                v-model="form.email"
              />

              <Button class="fade-up max-md:w-full">
                {{ $t("submit") }}
              </Button>
            </vee-form>
            <span
              v-if="unValidMail"
              :class="unValidMail ? 'block' : 'hidden'"
              class="text-red-500 mt-2 flex justify-center transition-all ease-in-out duration-300 delay-150"
            >
              {{ $t(`auth.unValidMail`) }}
            </span>
          </div>
        </div>

        <div v-if="hideSend && hideOtpForm" class="space-y-8">
          <div
            class="rounded-lg fade-up border p-6 bg-card text-card-foreground shadow-sm mx-auto max-w-lg  "
            data-v0-t="card"
          >
            <div class="flex flex-col pb-6 space-y-1 text-center">
              <h3
                class="fade-up whitespace-nowrap tracking-tight text-2xl font-bold"
              >
                {{ $t("auth.reset_password") }}
              </h3>
              <p class="fade-up text-sm text-muted-foreground">
                {{ $t("auth.reset_password_desc") }}
              </p>
            </div>
            <vee-form
              :validation-schema="schema1"
              @submit="onReset"
              class="space-y-6 w-full md:max-w-lg mx-auto"
            >
              <PasswordInput
                :placeholder="$t('auth.password_placeholder')"
                name="password"
                class="fade-up"
                v-model="form1.password"
                :label="$t('auth.password')"
              />
              <PasswordInput
                :placeholder="$t('auth.passwordConfirm_placeholder')"
                name="password_Confirmation"
                class="fade-up"
                v-model="form1.password_Confirmation"
                :label="$t('auth.confirm_password')"
              />

              <div class="flex gap-4 items-center justify-end">
                <div
                  @click="backStep"
                  class="fade-up flex items-center justify-center cursor-pointer transition-colors rounded-md h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                >
                  {{ $t("back") }}
                </div>
                <Button class="fade-up">{{ $t("submit") }}</Button>
              </div>

              <span
                v-if="unValidCode"
                :class="unValidCode ? 'block' : 'hidden'"
                class="text-red-500 mb-2 flex justify-center transition-all ease-in-out duration-300 delay-150"
              >
                {{ $t(`auth.${unValidCode}`) }}
              </span>
            </vee-form>
          </div>
        </div>

        <div v-if="!hideOtpForm && hideSend" class="flex flex-col ">
          <div class="text-center">
            <img src="../../assets/images/logo.png" class="mx-auto h-24 w-24 fade-up" />
            <div class="mt-5 space-y-2">
              <h3
                class="fade-up text-foreground text-2xl font-bold md:text-3xl"
              >
                {{ $t("auth.check_inbox") }}
              </h3>
              <p
                class="fade-up text-muted-foreground w-full md:max-w-xl mx-auto"
              >
                {{ $t("auth.reset_code_sended") }}
              </p>
            </div>
          </div>
          <div class="mt-4 mx-auto max-md:w-full max-w-sm">
            <vee-form
              @submit="onVerify"
              class="flex flex-col md:flex-row items-center max-md:space-y-2 gap-4 text-center"
            >
              <PinInput
                class="fade-up"
                id="pin-input"
                v-model="form.otp_number"
                placeholder="○"
              >
                <PinInputGroup>
                  <PinInputInput
                    v-for="(id, index) in 4"
                    :key="id"
                    :index="index"
                  />
                </PinInputGroup>
              </PinInput>
              <Button class="fade-up max-md:w-4/5 w-full">
                {{ $t("submit") }}
              </Button>
            </vee-form>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/BaseInput.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import { defineRule } from "vee-validate";
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from "@/components/ui/pin-input";
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { email, required, regex, min, confirmed } from "@vee-validate/rules";
import Loader from "@/components/Loader.vue";
import { ResetPassword, ForgotPassword } from "@/services/api";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";




defineRule("email", email);
defineRule("required", required);
defineRule("regex", regex);
defineRule("min", min);
defineRule("confirmed", confirmed);
const strongPassword =
  "(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[^A-Za-z0-9])(?=.{8,35})";

const { toast } = useToast();
const router = useRouter();

const unValidMail = ref("");
const unValidCode = ref("");
const hideSend = ref(false);
const loading = ref(false);
const hideOtpForm = ref(true);
const form = ref({
  email: "",
  otp_number: [],
});
const form1 = ref({
  password: "",
  password_Confirmation: "",
});

const schema1 = {
  password: { required: true, min: 8, regex: strongPassword },
  password_Confirmation: { required: true, confirmed: "@password" },
};

const authStore = useAuthStore();

const backStep = () => {
  loading.value = true;
  setTimeout(() => {
    hideOtpForm.value = true;
    hideSend.value = false;
    loading.value = false;
  }, 700);
};

// last
const onReset = (values) => {
  loading.value = true;
  const otp_number = form.value.otp_number.join("");


  ResetPassword({
    email: form.value.email,
    code: otp_number,
    password: values.password,
    c_password: values.password_Confirmation,
  })
    .then((response) => {
      if (response.status === 200) {
        toast({
          title: "auth.password_reseted_success",
          success: true,
          duration: 3000,
        });

        setTimeout(() => {
          loading.value = false;
          router.push({ name: "login", state: { email: form.value.email } });
        }, 1500);
      }
    })
    .catch((error) => {
      loading.value = false;
      if (error.status === 422) {
        unValidCode.value = "unValidCode";
      }
      if (!error.response) {
        toast({
          title: "network_error",
          error: true,
          duration: 3000,
        });
      }
    })

    .finally(() => {
      setTimeout(() => {
        loading.value = false;
      }, 1500);
      setTimeout(() => {
        unValidCode.value = "";
      }, 3500);
    });
};

// 2
const onVerify = () => {
  if (form.value.otp_number.length === 4) {
    loading.value = true;
    setTimeout(() => {
      hideOtpForm.value = true;
      loading.value = false;
    }, 1500);
  }
};

// 1
const onSend = (values, { resetForm }) => {
  loading.value = true;
  form.value.email = values.email;

  ForgotPassword({
    email: values.email,
  })
    .then((response) => {
      console.log(response);
      
      if (response.status === true) {
        setTimeout(() => {
          loading.value = false;
          hideSend.value = true;
          hideOtpForm.value = false;
          resetForm({
            values: {
              email: "",
            },
          });
        }, 1000);

        toast({
          title: "auth.code_sended",
          success: true,
          duration: 3000,
        });
        setTimeout(() => {
          hideSend.value = true;
          hideOtpForm.value = false;
        }, 1500);
      }
    })
    .catch((error) => {
      console.log(error);
      
      loading.value = false;
      if (error.status === 422) {
        unValidMail.value = "unValidMail";
      }

      if (!error.response) {
        toast({
          title: "network_error",
          error: true,
          duration: 3000,
        });
      }
    })

    .finally(() => {
      resetForm({
        values: {
          email: "",
        },
      });
      setTimeout(() => {
        unValidMail.value = "";
        loading.value = false;
      }, 1500);
    });
};

const schema = {
  email: { required: true, email: true },
};
</script>
