<template>
  <div className="">
    <div className="flex items-start justify-between mb-4 ">
      <Heading :title="$t('banners')" :description="$t('banners_page.banners_page_description')" />
      <AddBanner />
    </div>

    <DataTable
      v-if="bannersStore.Items?.length"
      :data="bannersStore.Items"
      :columns="columns"
    />
    <div v-else class="h-screen">
      <Loader noBg />
      <Skeleton class="h-16 mb-8 w-[100vh - 280px]" />
      <Skeleton class="h-[60vh] w-[100vh - 280px]" />
    </div>
  </div>
</template>

<script setup>
import { onMounted , ref } from 'vue'
import Heading from '@/components/heading.vue'

import DataTable from './components/DataTable.vue'
import { columns } from './components/columns'
import AddBanner from './components/AddBanner.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { useBannersStore } from '@/stores/appStore.js'
import Loader from '@/components/Loader.vue'
import { useAuthStore } from '@/stores/authStore'
import { getBanners } from '@/services/api'



const Banners = ref([])
const authStore = useAuthStore()
// useBannersStore
const bannersStore = useBannersStore()

onMounted(() => {
  bannersStore.getItems();
})
</script>
