<script setup>
import { computed } from 'vue'
import { ToastRoot, useForwardPropsEmits } from 'radix-vue'
import { toastVariants } from '.'
import { cn } from '@/lib/utils'

const props = defineProps({
  class: { type: null, required: false },
  variant: { type: null, required: false },
  onOpenChange: { type: Function, required: false, skipCheck: true },
  defaultOpen: { type: Boolean, required: false },
  forceMount: { type: Boolean, required: false },
  type: { type: String, required: false },
  success: { type: Boolean, required: false },
  error: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
  duration: { type: Number, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false }
})

const emits = defineEmits([
  'escapeKeyDown',
  'pause',
  'resume',
  'swipeStart',
  'swipeMove',
  'swipeCancel',
  'swipeEnd',
  'update:open'
])

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    :class="cn(toastVariants({ variant }), props.class)"
    @update:open="onOpenChange"
  >
    <slot />
    <svg
      v-if="props.success"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6 text-green-600 font-bold"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>

    <svg
      v-if="props.error"
      class="size-6 text-red-600 font-bold"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      />
    </svg>
  </ToastRoot>
</template>
