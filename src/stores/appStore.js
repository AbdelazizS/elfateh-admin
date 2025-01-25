import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getCategories,
  getProducts,
  getUsers,
  getNotifications,
  getOrders,
  getDeliveryBoys,
} from "../services/api";

/*
 * Categories API
 */

export const useCategoriesStore = defineStore("category", () => {
  /* state */
  const Items = ref([]);

  /* Actions */
  const getItems = (token) => {
    getCategories(token)
      .then((res) => {
        Items.value = res.data.categories;
      })
      .catch((err) => {});
  };

  return {
    Items,
    getItems,
  };
});

/*
 * Products API __________
 */

export const useProductsStore = defineStore("product", () => {
  /* state */
  const Items = ref([]);

  /* Actions */
  const getItems = (token) => {
    getProducts(token)
      .then((res) => {
        Items.value = res.data.Products;
      })
      .catch((err) => {});
  };

  return {
    Items,
    getItems,
  };
});

/*
 * Users API
 */

export const useUsersStore = defineStore("User", () => {
  /* state */
  const Items = ref([]);

  /* Actions */
  const getItems = (token) => {
    getUsers(token)
      .then((res) => {
      
        Items.value = res.data.clients;
      })
      .catch((err) => {});
  };

  return {
    Items,
    getItems,
  };
});

/*
 * Notifications API
 */

export const useNotificationsStore = defineStore("Notifications", () => {
  // state

  const Items = ref([]);


  
  const getItems = (token) => {
    getNotifications(token)
      .then((res) => {
        
        Items.value = res.data.Notifications;

      })
      .catch((err) => {
      });
  };
  const addItem = (item) => {
    //Find the object whose id is similar to the item
    const existingItem = Items.value.find((x) => x.id === item.id);

    if (!existingItem) {
      Items.value.push({ ...item, quantity: 1 });
    }
  };

  const removeItem = (ID) => {
    Items.value = Items.value.filter((x) => x.ID !== ID);
  };

  return {
    Items,
    addItem,
    getItems,
    removeItem,
  };
});

/*
 * DeliveryBoys API
 */

export const useDeliveryStore = defineStore("Delivery", () => {
  /* state */
  const Items = ref([]);

  /* Actions */
  const getItems = (token) => {
    getDeliveryBoys(token)
      .then((res) => {
        
        Items.value = res.data.Captains;
      })
      .catch((err) => {});
  };

  return {
    Items,
    getItems,
  };
});

/*
 * Orders API
 */

export const useOrdersStore = defineStore("order", () => {
  /* state */
  const Items = ref([]);

  /* Actions */
  const getItems = (token) => {
    getOrders(token)
      .then((res) => {
        
        Items.value = res.data.orders;
      })
      .catch((err) => {});
  };

  return {
    Items,
    getItems,
  };
});
