interface IDashboardMenus {
  title: string
  icon: string
  path: string
  description?: string
  hidden?: boolean
}

export const SIDEBAR_EXPAND_WIDTH = 280
export const SIDEBAR_COLLAPSED_WIDTH = 72
export const APP_MENU: Record<string, { name: string; routes: IDashboardMenus[] }> = {
  main: {
    name: 'core',
    routes: [
      {
        title: 'dashboard',
        icon: 'LayoutDashboard',
        path: 'home'
      }
    ]
  },
  Home: {
    name: 'home',
    routes: [
      {
        title: 'banners',
        icon: 'Image',
        path: 'banners'
      },
      {
        title: 'offers',
        icon: 'BadgePercent',
        path: 'offers'
      },
    ]
  },
  settings: {
    name: 'general',
    routes: [
      {
        title: 'categories',
        icon: 'LayoutDashboard',
        path: 'categories'
      },

      {
        title: 'products',
        icon: 'BookUpIcon',
        path: 'Products'
      },
      {
        title: 'users',
        icon: 'User',
        path: 'users'
      },
      {
        title: 'notifications',
        icon: 'BellRing',
        path: 'notifications'
      },
      {
        path: 'orders',
        title: 'orders',
        icon: 'WalletCards',
        description: 'Manage User'
      },
      {
        path: 'delivery',
        title: 'delivery',
        icon: 'Settings2',

        description: 'Settings'
      }
    ]
  }

  // AP: {
  //   name: '',
  //   routes: [
  //     {
  //       title: 'settings',
  //       path: 'settings',
  //       icon: 'Settings',
  //       description: 'Settings'
  //     },
  //   ],
  // },
}

export const globalSearch = {}
