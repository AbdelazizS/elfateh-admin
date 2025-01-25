<script setup lang="ts">
import GlobalSearchPopover from '@/components/core/GlobalSearchPopover.vue'

import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import { Sun, MoonStar, Menu } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/stores/app'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import Account from '@/components/Account.vue'

const store = useAppStore()

const toggleMode = () => {
  store.toggleTheme()
}
</script>

<template>
  <nav
    class="flex items-center justify-between h-[64px] border-b-[1px] px-4 fixed z-40 top-0 bg-background/80 backdrop-blur-lg border-border"
    :style="{ width: store.navWidth }"
  >
    <div class="w-24 hidden lg:block">
      <Breadcrumb />
    </div>
    <div class="w-2/5 hidden lg:block">
      <GlobalSearchPopover />
    </div>

    <Button
      variant="outline"
      class="p-[6px] w-8 h-8 transition-all duration-200 block lg:hidden"
      :class="store.sidebarExpanded ? 'bg-transparent' : 'dark:bg-white'"
      @click="store.toggleSidebar()"
    >
      <Menu class="transition-all duration-500 text-black" />
    </Button>
    <div class="flex items-center">
      <!-- <Button variant="outline" class="border-0 p-[6px] w-8 h-8">
        <Bell />
      </Button> -->

      <LanguageSwitcher />
      <Button variant="outline" class="border-0 p-[6px] ms-2 w-8 h-8" @click="toggleMode">
        <Sun v-if="store.isDark" />
        <MoonStar v-else />
      </Button>

      <div class="border-x-[1px] border-gray-300 h-[24px] w-[1px] mx-2"></div>

      <Account />
    </div>
  </nav>
</template>
