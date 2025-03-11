<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { defineProps } from 'vue'

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})

console.log(props.orders)
</script>

// && order.status === 'completed'
<template>
  <div class="space-y-8" v-if="props.orders.length">
    <div
      class="flex items-center"
      v-for="order in props.orders
        .filter((order) => order.Client_Name !== 'Not Available')
        .slice(-6)"
      :key="order.id"
    >
      <Avatar class="h-9 w-9 border border-primary/20">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback class="font-bold">{{ order.Client_Name[0] }}</AvatarFallback>
      </Avatar>
      <div class="ms-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          {{ order.Client_Name }}
        </p>
        <p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
      </div>
      <div class="ms-auto font-medium">+$1,999.00</div>
    </div>
  </div>
</template>
