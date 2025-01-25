<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { setLocale } from '@/plugins/i18n'
import i18n from '@/plugins/i18n'
import { useAuthStore } from '@/stores/authStore'

const locale = () => (i18n.global.locale.value === 'ar' ? 'arabic' : 'english')

const store2 = useAuthStore()

const changeLocale = (locale) => {
  setLocale(locale)
  store2.setLoading()
  setTimeout(() => {
    store2.setLoading()
  }, 1000)
}

const props = defineProps({
  hide: Boolean
})
</script>

<template>
  <DropdownMenu :dir="i18n.global.locale.value === 'ar' ? 'rtl' : 'ltr'">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" :class="`flex gap-1 justify-start`">
        <svg
          v-if="!props.hide"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-foreground"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
          />
        </svg>

        <span class="text-foreground"> {{ $t(locale())  }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuRadioGroup v-model="i18n.global.locale.value">
        <DropdownMenuRadioItem value="ar" @click="changeLocale('ar')">
          {{ $t('arabic') }}
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="en" @click="changeLocale('en')">
          {{ $t('english') }}
          
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
