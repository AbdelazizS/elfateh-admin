<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    :class="`fixed bg-black/15 dark:bg-black/20 ${props.noBg ? 'top-1/2 left-1/2 ':'inset-0'}  ${props.bgWhite && `!bg-card`}  ${props.noBg && `!bg-transparent`} `"
    class="z-50 flex items-center justify-center left-0 top-0"
  >
    <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
      <div class="flex justify-center">
        <div
          class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-primary rounded-full"
          role="status"
          aria-label="loading"
        ></div>
      </div>
    </div>
  </div>
</template>


<script  setup>

const props = defineProps({
  noBg: { type: Boolean },
  bgWhite: { type: Boolean },
});

</script>
