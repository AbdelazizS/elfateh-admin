<template>
  <div className="">
    <div className="flex items-start justify-between mb-4 ">
      <Heading
        :title="$t('offers')"
        :description="$t('offers_page.offers_page_description')"
      />
      <AddOffer />
    </div>

    <DataTable
      v-if="offersStore.Items?.length"
      :data="offersStore.Items"
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
import { onMounted } from 'vue'
import Heading from '@/components/heading.vue'

import DataTable from './components/DataTable.vue'
import { columns } from './components/columns'
import AddOffer from './components/AddOffer.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { useOffersStore} from '@/stores/appStore.js'
import Loader from '@/components/Loader.vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const offersStore = useOffersStore();

onMounted(() => {
  offersStore.getItems(authStore.token)

})
</script>