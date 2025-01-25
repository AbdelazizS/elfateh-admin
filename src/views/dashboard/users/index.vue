<template>
  <div className="">
    <div className="flex items-start justify-between mb-4 ">
      <Heading :title="$t('users')" :description="$t('users_page.users_page_description')" />
      <AddUser />
    </div>
    <DataTable v-if="usersStore.Items?.length" :data="usersStore.Items" :columns="columns" />
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
import AddUser from './components/AddUser.vue'
import { columns } from './components/columns.ts'
import DataTable from './components/DataTable.vue'
import Loader from '@/components/Loader.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { useUsersStore } from '@/stores/appStore.js'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const usersStore = useUsersStore()

onMounted(() => {
  usersStore.getItems(authStore.token)
})
</script>