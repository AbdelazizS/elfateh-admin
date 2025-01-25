<template>
  <div className="">
    <div className="flex items-start justify-between mb-4 ">
      <Heading
        :title="$t('notifications')"
        :description="$t('notifications_page.notifications_page_description')"
      />
      <AddNotification />
    </div>

    <DataTable
      v-if="notificationsStore.Items?.length"
      :data="notificationsStore.Items"
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
import AddNotification from './components/AddNotification.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { useNotificationsStore } from '@/stores/appStore.js'
import { useAuthStore } from '@/stores/authStore'
import Loader from '@/components/Loader.vue'

const notificationsStore = useNotificationsStore()
const authStore = useAuthStore()

onMounted(() => {
  notificationsStore.getItems(authStore.token)
})
</script>