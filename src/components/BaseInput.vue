<template>
  <div class="wrapper">
    <!-- :class="{ 'has-error': !!errorMessage, success: meta.valid }" -->
    <div :class="`${label ? 'space-y-2' : ''}`">
      <label class="text-sm font-medium leading-none" :for="name">{{ label }}</label>
      <input
        :class="{
          'border-2 border-red-400': !!errorMessage,
          success: meta.valid,
          'border border-input bg-background': !search_bar,
          'bg-transparent': search_bar
        }"
        class="flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-0"
        :name="name"
        :id="name"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
      />
    </div>

    <p class="text-red-500 ps-0.5 mt-[1px]" v-if="errorMessage && !hide_error">
      {{ $t(`${errorMessage}`) }}

    </p>
  </div>
</template>

<script setup>
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  search_bar: {
    type: Boolean,
    default: false
  },
  hide_error: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  successMessage: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const name = toRef(props, 'name')
const hide_error = toRef(props, 'hide_error')
const {
  value: inputValue,
  errorMessage,
  // handleBlur,
  handleChange,
  meta
} = useField(name, undefined, {
  initialValue: props.value
})
</script>
