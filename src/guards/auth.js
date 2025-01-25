import { useAuthStore } from '@/stores/authStore'
export function authGuard(to, from, next) {
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
}
