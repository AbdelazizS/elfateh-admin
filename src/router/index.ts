import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import DashboardLayoutVue from '@/layouts/dashboard.vue';
import { authGuard } from '@/guards/auth'

interface IRouteMeta {
  title: string
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard/home',
      
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {
       
        title: 'Login',
      } as RouteMeta & IRouteMeta,
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('@/views/auth/Register.vue'),
      meta: {
       
        title: 'register',
      } as RouteMeta & IRouteMeta,
    },
    {
      path: '/auth/verify',
      name: 'verify',
      component: () => import('@/views/auth/Verify.vue'),
      meta: {
       
        title: 'verify',
      } as RouteMeta & IRouteMeta,
    },
    {
      path: '/auth/forgot-password',
      name: 'ForgotPassword',
      component: () => import('@/views/auth/ForgotPassword.vue'),
      meta: {
       
        title: 'ForgotPassword',
      } as RouteMeta & IRouteMeta,
    },
    {
      path: '/dashboard',
      
      component: DashboardLayoutVue,
      redirect: '/dashboard/home',
      meta: {
        requiresAuth:true,
        title: 'dashboard',
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/Home.vue'),
          meta: {
            title: 'home',
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'categories',
          name: 'categories_index',
          component: () => import('@/views/dashboard/categories/index.vue'),
          meta: {
            title: 'categories',
          } as RouteMeta & IRouteMeta
        },

        {
          path: 'offers',
          name: 'offers_index',
          component: () => import('@/views/dashboard/offers/index.vue'),
          meta: {
            title: 'offers',
          } as RouteMeta & IRouteMeta
        },
        

        {
          path: 'banners',
          name: 'banners_index',
          component: () => import('@/views/dashboard/banners/index.vue'),
          meta: {
            title: 'banners',
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'products',
          name: 'products_index',
          component: () => import('@/views/dashboard/products/index.vue'),
          meta: {
            title: 'products',
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'users',
          name: 'users_index',
          component: () => import('@/views/dashboard/users/index.vue'),
          meta: {
            title: 'users',
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'orders',
          name: 'orders_index',
          component: () => import('@/views/dashboard/orders/index.vue'),
          meta: {
            title: 'orders',
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'notifications',
          name: 'notifications_index',
          component: () => import('@/views/dashboard/notifications/index.vue'),
          meta: {
            title: 'notifications',
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'delivery',
          name: 'delivery_index',
          component: () => import('@/views/dashboard/delivery/index.vue'),
          meta: {
            title: 'delivery',
          } as RouteMeta & IRouteMeta
        },
        // {
        //   path: 'products',
        //   name: 'products_index',
        //   component: () => import('@/views/dashboard/products/Index.vue'),
        //   meta: {
        //     title: 'Products',
        //   } as RouteMeta & IRouteMeta
        // },
        // {
        //   path: 'user',
        //   name: 'user_index',
        //   component: () => import('@/views/dashboard/user/Index.vue'),
        //   meta: {
        //     title: 'User',
        //   } as RouteMeta & IRouteMeta
        // },
        // {
        //   path: 'settings',
        //   name: 'settings_index',
        //   component: () => import('@/views/dashboard/examples/settings/Index.vue'),
        //   meta: {
        //     title: 'Settings',
        //   } as RouteMeta & IRouteMeta
        // },
      ],
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('@/views/errors/404.vue'),
      meta: {
        title: 'Page Not Found',
      } as RouteMeta & IRouteMeta,
    },
  ]
});

router.beforeEach(authGuard)
router.beforeEach((loc) => {
  document.title = loc.meta.title as string;
})

export default router
