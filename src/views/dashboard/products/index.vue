<template>
  <div className="">
    <div className="flex items-start justify-between mb-4 ">
      <Heading
        :title="$t('products')"
        :description="$t('products_page.products_page_description')"
      />

      <AddProduct />
    </div>
    <DataTable
      v-if="productsStore.Items?.length"
      :data="productsStore.Items"
      :columns="columns"
    />

    <div v-else class="h-screen">
      <Loader noBg />
      <Skeleton class="h-16 mb-8 w-[100vh - 280px]" />
      <Skeleton class="h-[60vh] w-[100vh - 280px]" />
    </div>
    <!-- <Separator /> -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Heading from '@/components/heading.vue'

import DataTable from './components/DataTable.vue'
import { columns } from './components/columns'

import AddProduct from './components/AddProduct.vue'
import Loader from '@/components/Loader.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { useProductsStore } from '@/stores/appStore.js'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.getItems(authStore.token)
})
</script>