<script setup>
import DashboardSidebar from '@/components/core/sidebar/DashboardSidebar.vue'
import DashboardNavbar from '@/components/core/DashboardNavbar.vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/authStore'
import Loader from '@/components/Loader.vue'

const store = useAppStore()
const store2 = useAuthStore()

const style = () => {
  if (document.documentElement.dir === 'ltr') {
    return `left: ${store.wrapperLeftOffset}px; width: calc(100% - ${store.wrapperLeftOffset}px)`
  } else if (document.documentElement.dir === 'rtl') {
    return `right: ${store.wrapperLeftOffset}px; width: calc(100% - ${store.wrapperLeftOffset}px)`
  }
}


</script>

<template>
  <div>
    <Loader bgWhite="true" v-if="store2.Loading" />
    <DashboardSidebar />
    <div class="relative app-container dashboard-main" :style="style()">
      <DashboardNavbar />
      <div class="p-2 lg:p-6 max-w-[1440px] m-auto mt-[64px]">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>
