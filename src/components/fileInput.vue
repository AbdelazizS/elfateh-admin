<template>
  <div class="">
    <Field name="image" v-slot="{ handleChange, errorMessage , meta  }">
      <label class="text-sm font-medium leading-none" >{{ label }}</label>
      <input
        type="file"
        :class="{
          'mt-2': label ,
          'border-2 border-red-500': !!errorMessage ,
          'success border-green-500 border-2': meta.valid,
        }"
        @change="handleChange"
        class="flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-0 border border-input bg-background cursor-pointer"
      />
      <p v-if="errorMessage" class="block text-red-500 ps-0.5 mt-[1px]" name="image">
        {{$t(errorMessage)}}
      </p>
    </Field>
  </div>
</template>

<script setup>
import { ErrorMessage, Field } from 'vee-validate'
import { toRef } from 'vue'

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
</script>


