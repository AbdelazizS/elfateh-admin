<template>
  <div className="">
    <div  className="flex items-start justify-between mb-4 ">
      <Heading :title="$t('delivery')" :description="$t('delivery_page.delivery_page_description')" />
      <AddDeliveryBoy />
    </div>
    <DataTable v-if="deliveryStore.Items?.length" :data="deliveryStore.Items" :columns="columns" />
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
import AddDeliveryBoy from './components/AddDeliveryBoy.vue'
import { columns } from './components/columns.ts'
import DataTable from './components/DataTable.vue'
import Loader from '@/components/Loader.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { useDeliveryStore } from '@/stores/categoriesStore.js'
import { useAuthStore } from '@/stores/authStore'

const data = ref([])
const authStore = useAuthStore()

const deliveryStore = useDeliveryStore()

onMounted(() => {
  deliveryStore.getItems()
})
</script>
