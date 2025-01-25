<script setup>
import { computed } from 'vue'
import { ToastViewport } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps({
  hotkey: { type: Array, required: false },
  label: { type: [String, Function], required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false }
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastViewport
    v-bind="delegatedProps"
    :class="
      cn(
        'fixed top-0 z-[10000000000000000000000] flex w-full flex-col-reverse p-4  rtl:left-0  ltr:right-0 md:max-w-[420px]',
        props.class
      )
    "
  />
</template>
