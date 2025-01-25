<template>
  <div className="">
    <div className="flex items-start justify-between mb-4 ">
      <Heading :title="$t('orders')" :description="$t('orders_page.orders_page_description')" />
      <!-- <AddOrder /> -->
    </div>
    <DataTable v-if="ordersStore.Items?.length" :data="ordersStore.Items" :columns="columns" />
    <div v-else class="h-screen">
      <Loader noBg />
      <Skeleton class="h-16 mb-8 w-[100vh - 280px]" />
      <Skeleton class="h-[60vh] w-[100vh - 280px]" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Heading from '@/components/heading.vue'
// import AddOrder from './components/AddOrder.vue'
import { columns } from './components/columns.ts'
import DataTable from './components/DataTable.vue'
import Loader from '@/components/Loader.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { useOrdersStore } from '@/stores/categoriesStore.js'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const ordersStore = useOrdersStore()

onMounted(() => {
  ordersStore.getItems(authStore.token)
})
</script>
