<script setup lang="ts">
import { Toggle } from '@/components/ui/toggle'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import i18n from '@/plugins/i18n'
import router from '@/router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { APP_MENU } from '@/config/app'
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-vue-next'
import { useAppStore } from '@/stores/app'

const route = useRoute()

const menus = computed(() =>
  Object.entries(APP_MENU).map(([key, value]) => ({
    key,
    name: value.name,
    routes: value.routes.map((r) => ({
      ...r,
      active: `/dashboard/${r.path}` === route.path
    }))
  }))
)

const handleNavigate = (path: string) => {
  router.push(path)
  if (window.innerWidth < 1025) {
    store.toggleSidebar()
  }
}

const store = useAppStore()

const toggleSidebar = () => {
  store.toggleSidebar()
}
</script>

<template>
  <div
    class="sidebar transition-all duration-400 h-screen overflow-hidden bg-background border-r-[1px] fixed"
    :style="{ width: `${store.wrapperWidth}px` }"
  >
    <div class="relative h-full flex flex-col">
      <div>
        <div class="h-[64px]">
          <div
            class="px-4 h-[64px] flex fixed z-10 items-center justify-between border-b-[1px]"
            :style="{ width: `${store.sidebarExpanded ? 280 : 64}px` }"
          >
            <transition name="fade">
              <h2
                v-show="store.sidebarExpanded"
                class="text-2xl font-semibold flex gap-2 items-center"
              >
                <img src="../../../assets/images/logo.png" alt="" class="h-[64px]" />
                Elfateh
              </h2>
            </transition>
            <Button
              variant="outline"
              class="p-[6px] w-8 h-8 transition-all duration-200"
              :class="store.sidebarExpanded ? 'bg-transparent' : 'dark:bg-white'"
              @click="toggleSidebar"
            >
              <ArrowLeftToLine
                v-if="i18n.global.locale.value === 'en'"
                class="transition-all duration-500"
                :class="!store.sidebarExpanded && 'rotate-180 text-black'"
              />

              <ArrowRightToLine
                v-else
                class="transition-all duration-500"
                :class="!store.sidebarExpanded && 'rotate-180 text-black'"
              />
            </Button>
          </div>
        </div>

        <!-- <ScrollArea style="height: calc(100%)"> -->
        <div
          v-for="menu in menus"
          :key="menu.key"
          class="border-b-[1px] transition-all"
          :class="store.sidebarExpanded ? 'p-4' : 'p-2'"
        >
          <p
            v-show="store.sidebarExpanded"
            class="uppercase text-xs font-light text-gray-400 mb-2 tracking-widest transition-all duration-300 delay-100"
            :class="store.sidebarExpanded ? 'visible opacity-100' : 'invisible opacity-0'"
          >
            {{ $t(menu.name) }}
          </p>
          <ul>
            <li
              v-for="child in menu.routes"
              :key="`${menu.key}-${child.path}`"
              class="flex items-center mb-1 rounded-md"
            >
              <TooltipProvider :disable-hoverable-content="true">
                <Tooltip :delay-duration="0">
                  <TooltipTrigger class="w-full">
                    <Toggle
                      class="w-full overflow-x-hidden justify-start duration-150"
                      :pressed="child.active"
                      @click="handleNavigate(child.path)"
                    >
                      <span
                        class="flex items-center"
                        :class="store.sidebarExpanded ? 'me-3' : 'm-0'"
                      >
                        <Icon :name="child.icon" />
                      </span>
                      <transition name="fade" :duration="300">
                        <span v-show="store.sidebarExpand">{{ $t(child.title) }}</span>
                      </transition>
                    </Toggle>
                  </TooltipTrigger>
                  <template v-if="!store.sidebarExpanded">
                    <TooltipContent side="right">
                      <p class="text-sm">{{ $t(child.title) }}</p>
                    </TooltipContent>
                  </template>
                </Tooltip>
              </TooltipProvider>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="transition-all duration-400 py-4 mt-auto"
        :class="store.sidebarExpanded ? 'opacity-100' : 'opacity-0'"
      >
        <p class="text-xs text-foreground/50 text-center">2024 Elfateh &copy;</p>
      </div>
    </div>
  </div>
</template>
