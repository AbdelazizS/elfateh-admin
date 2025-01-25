import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getCategories,
  getUsers,
  getDeliveryBoys,
  getOrders,
  getNotifications,
  getProducts
} from '../services/api'

export const useCategoriesStore = defineStore('Category', () => {
  // state
  const loading = ref(false)

  const Items = ref([])

  console.log(Items)

  const itemLoading = (value) => {
    loading.value = value
  }

  const getItems = () => {
    getCategories()
      .then((res) => {
        Items.value = res.data.categories
        console.log(res.data.categories)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const addItem = (item) => {
    //Find the object whose id is similar to the item
    const existingItem = Items.value.find((x) => x.id === item.id)

    if (!existingItem) {
      Items.value.push({ ...item, quantity: 1 })
    }
  }

  const removeItem = (ID) => {
    Items.value = Items.value.filter((x) => x.ID !== ID)
  }

  return {
    Items,
    addItem,
    getItems,
    removeItem,
    itemLoading
  }
})

export const useUsersStore = defineStore('Users', () => {
  // state
  const loading = ref(false)

  const Items = ref([])

  console.log(Items.value, 'val')

  const itemLoading = (value) => {
    loading.value = value
  }

  const getItems = (token) => {
    getUsers(token)
      .then((res) => {
        Items.value = res.data.clients

        console.log(res.data.clients)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const addItem = (item) => {
    //Find the object whose id is similar to the item
    const existingItem = Items.value.find((x) => x.id === item.id)

    if (!existingItem) {
      Items.value.push({ ...item, quantity: 1 })
    }
  }

  const removeItem = (ID) => {
    Items.value = Items.value.filter((x) => x.ID !== ID)
  }

  return {
    Items,
    addItem,
    getItems,
    removeItem,
    itemLoading
  }
})

export const useDeliveryStore = defineStore('delivery', () => {
  // state
  const loading = ref(false)

  const Items = ref([])

  console.log(Items.value, 'val')

  const itemLoading = (value) => {
    loading.value = value
  }

  const getItems = () => {
    getDeliveryBoys()
      .then((res) => {
        Items.value = res.data.Captains

        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const addItem = (item) => {
    //Find the object whose id is similar to the item
    const existingItem = Items.value.find((x) => x.id === item.id)

    if (!existingItem) {
      Items.value.push({ ...item, quantity: 1 })
    }
  }

  const removeItem = (ID) => {
    Items.value = Items.value.filter((x) => x.ID !== ID)
  }

  return {
    Items,
    addItem,
    getItems,
    removeItem,
    itemLoading
  }
})

export const useOrdersStore = defineStore('order', () => {
  // state
  const loading = ref(false)

  const Items = ref([])

  console.log(Items.value, 'val')

  const itemLoading = (value) => {
    loading.value = value
  }

  const getItems = (token) => {
    getOrders(token)
      .then((res) => {
        Items.value = res.data.orders

        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const addItem = (item) => {
    //Find the object whose id is similar to the item
    const existingItem = Items.value.find((x) => x.id === item.id)

    if (!existingItem) {
      Items.value.push({ ...item, quantity: 1 })
    }
  }

  const removeItem = (ID) => {
    Items.value = Items.value.filter((x) => x.ID !== ID)
  }

  return {
    Items,
    addItem,
    getItems,
    removeItem,
    itemLoading
  }
})

export const useNotificationsStore = defineStore('messages', () => {
  // state
  const loading = ref(false)

  const Items = ref([])

  console.log(Items.value, 'val')

  const itemLoading = (value) => {
    loading.value = value
  }

  const getItems = (token) => {
    getNotifications(token)
      .then((res) => {
        Items.value = res.data.Notifications
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const addItem = (item) => {
    //Find the object whose id is similar to the item
    const existingItem = Items.value.find((x) => x.id === item.id)

    if (!existingItem) {
      Items.value.push({ ...item, quantity: 1 })
    }
  }

  const removeItem = (ID) => {
    Items.value = Items.value.filter((x) => x.ID !== ID)
  }

  return {
    Items,
    addItem,
    getItems,
    removeItem,
    itemLoading
  }
})

export const useProductsStore = defineStore('product', () => {
  // state
  const loading = ref(false)

  const Items = ref([])

  console.log(Items.value, 'val')

  const itemLoading = (value) => {
    loading.value = value
  }

  const getItems = () => {
    getProducts()
      .then((res) => {
        Items.value = res.data.Products
        console.log(res.data.Products)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const addItem = (item) => {
    //Find the object whose id is similar to the item
    const existingItem = Items.value.find((x) => x.id === item.id)

    if (!existingItem) {
      Items.value.push({ ...item, quantity: 1 })
    }
  }

  const removeItem = (ID) => {
    Items.value = Items.value.filter((x) => x.ID !== ID)
  }

  return {
    Items,
    addItem,
    getItems,
    removeItem,
    itemLoading
  }
})
