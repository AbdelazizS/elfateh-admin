<template>
  <div class="wrapper">
    <div class="relative space-y-2">
      <label class="text-sm font-medium leading-none" :for="name">{{ label }}</label>
      <input
        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        :type="show ? 'text' : 'password'"
        id="currentPassword"
        :name="name"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
      />

      <div
        @click="handleShow"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground absolute bottom-1 end-1 h-7 w-7 cursor-pointer"
      >
        <Eye v-if="show" class="size-5 transition-all" />
        <EyeOff v-else class="text-muted-foreground/80 size-5 transition-all" />
      </div>
    </div>

    <p class="text-red-400 ps-0.5 mt-[1px]" v-if="errorMessage">
      {{ $t(`${errorMessage}`) }}
    </p>
  </div>
</template>

<script setup>
import { toRef, ref } from 'vue'
import { useField } from 'vee-validate'
import { EyeOff, Eye } from 'lucide-vue-next'

const props = defineProps({
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
const show = ref(false)

const handleShow = () => {
  show.value = !show.value
}

const {
  value: inputValue,
  errorMessage,
  handleChange
} = useField(name, undefined, {
  initialValue: props.value
})
</script>
