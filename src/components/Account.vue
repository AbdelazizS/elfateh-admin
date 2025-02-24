<script setup>
import { Settings, LogOut, User } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { useToast } from './ui/toast'
// import { ref } from 'vue'

const { toast } = useToast()

// const loading = ref(false)

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const handleLogout = () => {
  authStore.setLoading()
  authStore.logout()

  setTimeout(() => {
    authStore.setLoading()

    toast({
      title: 'auth.logout_success',
      success: true,
      duration: 3000
    })
    window.location.reload()
  }, 1200)
}
</script>

<template>
  <!-- <Loader v-if="loading" /> -->

  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="sm" class="p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48 md:w-56 me-2 rtl-dir" v-if="isAuthenticated">
      <DropdownMenuLabel>{{ $t(`account`) }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup class="space-y-.5">
        <!-- <RouterLink to="/dashboard/profile">
          <DropdownMenuItem>
            <User class="me-2 h-4 w-4" />
            <span>{{ $t(`profile`) }}</span>
          </DropdownMenuItem>
        </RouterLink>

        <RouterLink to="/dashboard/settings">
          <DropdownMenuItem>
            <Settings class="me-2 h-4 w-4" />
            <span>{{ $t(`settings`) }}</span>
          </DropdownMenuItem>
        </RouterLink> -->
      </DropdownMenuGroup>
      <!-- <DropdownMenuSeparator /> -->
      <DropdownMenuItem @click="handleLogout">
        <LogOut class="me-2 h-4 w-4" />
        <span>{{ $t(`sign_out`) }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
