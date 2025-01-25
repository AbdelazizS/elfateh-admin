<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { onBeforeMount } from 'vue'
import i18n from '@/plugins/i18n'
import Toaster from '@/components/ui/toast/Toaster.vue'



onMounted(() => {
  useAppStore().initTheme()
})

const locale = ref(i18n.global.locale)

watch(locale, () => {
  console.log('locale', locale.value)
  if (i18n.global.locale.value === 'en') {
    document.documentElement.dir = 'ltr'
    document.documentElement.setAttribute('dir', 'ltr')
  } else {
    document.documentElement.dir = 'rtl'
    document.documentElement.setAttribute('dir', 'rtl')
  }
})

onBeforeMount(() => {
  console.log(i18n.global.locale.value)

  if (i18n.global.locale.value === 'en') {
    document.documentElement.dir = 'ltr'
    document.documentElement.setAttribute('dir', 'ltr')
  } else {
    document.documentElement.dir = 'rtl'
    document.documentElement.setAttribute('dir', 'rtl')
  }
})
</script>

<template>
  

  <div class="absolute top-4 right-4">

    <Toaster />
  </div>
  <router-view v-slot="{ Component, route}">
    <transition name="fade" mode="out-in">
      <div :key="route.name">
        <component :is="Component" />

      </div>
    </transition>
  </router-view>
</template>
