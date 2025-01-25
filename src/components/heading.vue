<template>
    <div class="mb-6">
      <h2 class="text-3xl font-bold tracking-tight">{{props.title}}</h2>
      <p class="text-sm text-muted-foreground mt-1">{{props.description}}</p>
    </div>
</template>


<script setup>

const props = defineProps({
  title: { type: String, required: false },
  description: { type: String, required: false }
});


</script>