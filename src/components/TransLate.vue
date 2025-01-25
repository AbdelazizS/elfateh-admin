<template>
  {{ $t(props.item.key) }}
</template>

<script setup>
const props = defineProps({
  item: { type: Object }
})
</script>

<style scoped></style>
