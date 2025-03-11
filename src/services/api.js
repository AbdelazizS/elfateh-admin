import axios from 'axios'

const host = import.meta.env.VITE_BASE_API_URL
const STORE_BASE_URL = import.meta.env.VITE_BASE_URL
const baseURL = `${host}`

export const instance = axios.create({
  baseURL: baseURL
})

/*
 *   Banners-API's
 */

export const getBanners = () => {
  return new Promise((resolve, reject) => {
    axios
      // product_category
      .get(`${STORE_BASE_URL}banner`)
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const addBanner = ({ title, image, product_id }) => {
  const formData = new FormData()
  formData.append('title', title)
  if (image) {
    formData.append('image', image)
  }
  formData.append('product_id', product_id)

  return new Promise((resolve, reject) => {
    axios
      // product_category
      .post(`${STORE_BASE_URL}banner_store`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const updateBanner = ({ title, image, product_id, id }) => {
  const formData = new FormData()
  formData.append('title', title)
  if (image) {
    formData.append('image', image)
  }
  formData.append('product_id', product_id)
  formData.append('id', id)

  return new Promise((resolve, reject) => {
    axios
      // product_category
      .post(`${STORE_BASE_URL}banner_update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const deleteBanner = ({ id }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${STORE_BASE_URL}banner_delete`, {
        id: id
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/*
 *   Offers-API's
 */

export const getOffers = (token) => {
  return new Promise((resolve, reject) => {
    instance
      .post('offers', {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const addOffer = ({ title, image, price, token }) => {
  const formData = new FormData()
  formData.append('offer_title', title)
  formData.append('offer_price', price)
  if (image) {
    formData.append('offer_image', image)
  }
  formData.append('token', token)

  return new Promise((resolve, reject) => {
    instance
      .post('offers/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((resp) => {        
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const updateOffer = ({ title, image, price, token ,id }) => {
  const formData = new FormData()
  formData.append('offer_title', title)
  formData.append('offer_price', price)
  if (image) {
    formData.append('offer_image', image)
  }
  formData.append('token', token)

  return new Promise((resolve, reject) => {
    instance
      .post(`offers/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const deleteOffer = ({ token, id }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(`offers/delete/${id}`, {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/*
 *   States-API's
 */

export const getStates = () => {
  return new Promise((resolve, reject) => {
    axios
      // product_category
      .post(`${STORE_BASE_URL}get_states`)
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/*
 *   Localities-API's
 */

export const getLocalities = (state_id) => {
  return new Promise((resolve, reject) => {
    axios
      // product_category

      .post(`${STORE_BASE_URL}get_localities`, {
        state_id
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/*
 *   Products-API's
 */
export const addProduct = ({
  product_name,
  product_description,
  category_id,
  product_price,
  product_price_old,
  image,
  token
}) => {
  const formData = new FormData()
  formData.append('product_name', product_name)
  formData.append('product_description', product_description)
  formData.append('category_id', category_id)
  formData.append('product_price', product_price)
  formData.append('product_price_old', product_price_old)
  formData.append('image', image)
  formData.append('token', token)

  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post('products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const updateProduct = ({
  product_name,
  product_description,
  category_id,
  product_price,
  product_id,
  product_price_old,
  image,
  token
}) => {
  const formData = new FormData()
  formData.append('product_name', product_name)
  formData.append('product_description', product_description)
  formData.append('category_id', category_id)
  formData.append('product_price', product_price)
  formData.append('product_price_old', product_price_old)
  if (image) {
    formData.append('image', image)
  }

  formData.append('token', token)

  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post(`products/edit/${product_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const deleteProduct = ({ token, id }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(`products/delete/${id}`, {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getProducts = (token) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post('products', {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/*
 *   Notifications-API's
 */

export const addNotification = ({ title, Notification, user_id, token }) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post('messages/add', {
        title: title,
        notification: Notification,
        client_id: user_id,
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const updateNotification = ({ Notification, title, id, token }) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post(`messages/edit/${id}`, {
        title: title,
        notification: Notification,
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const deleteNotification = ({ token, id }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(`messages/delete/${id}`, {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getNotifications = (token) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post('messages', {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/*
 *   Delivery-API's
 */

export const addDeliveryBoy = ({ token, transportation_type, note, image, name, email }) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('image', image)
  formData.append('transportation_type', transportation_type)
  formData.append('note', note)
  formData.append('phone', email)
  formData.append('token', token)

  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post('delivery/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const updateDeliveryBoy = ({ token, id, transportation_type, note, image, name, email }) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('image', image)
  formData.append('transportation_type', transportation_type)
  formData.append('note', note)
  formData.append('phone', email)
  formData.append('token', token)

  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post(`delivery/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const deleteDeliveryBoy = ({ token, id }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(`delivery/delete/${id}`, {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getDeliveryBoys = (token) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post('delivery', {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// Orders-API's
export const addOrder = ({
  client_id,
  total_price,
  transportation_cost,
  location,
  prominent_place,
  locality_id,
  state_id,
  product_id,
  product_name,
  product_price,
  quantity,
  product_transportation_cost,
  token
}) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post('orders_add', {
        client_id,
        total_price,
        transportation_cost,
        location,
        prominent_place,
        state_id,
        locality_id,
        type: '1',
        platform: '1',
        order_details: [
          {
            product_id,
            product_name,
            product_price,
            quantity,
            transportation_cost: product_transportation_cost
          }
        ],
        token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const updateOrder = ({ order_id, status_id, token }) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post(`orders/edit/${order_id}`, {
        status_id,
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const deleteOrder = ({ token, id }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(`orders/delete/${id}`, {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getOrders = (token) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post('orders', {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(reject)
      })
  })
}

/*
 *   Users-API's
 */

export const deleteUser = ({ token, id }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(`user_management/clients/delete/${id}`, {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const addUser = ({ name, email, token, password, password_confirmation, phone }) => {
  return new Promise((resolve, reject) => {
    instance
      .post('user_management/clients/add', {
        token: token,
        name,
        email,
        password,
        password_confirmation,
        phone
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const updateUser = ({ name, email, token, password, password_confirmation, phone, id }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(`user_management/clients/edit/${id}`, {
        token: token,
        name,
        email,
        password,
        password_confirmation,
        phone
      })

      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getUsers = (token) => {
  return new Promise((resolve, reject) => {
    instance
      .post(
        'user_management/clients',
        {
          token: token
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/*
 *  Categories-API's
 */

export const addCategory = ({ name, image, token }) => {
  const formData = new FormData()
  if (image) {
    formData.append('image', image)
  }
  formData.append('category_name', name)
  formData.append('token', token)

  return new Promise((resolve, reject) => {
    axios

      .post(
        `${baseURL}settings/categories/add`,

        formData,

        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const updateCategory = ({ id, name, token, image }) => {
  const formData = new FormData()
  formData.append('category_name', name)
  if (image) {
    formData.append('image', image)
  }
  formData.append('token', token)

  // formData.append('transportation_type', transportation_type)

  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post(`settings/categories/edit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const deleteCategory = ({ token, id }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(`settings/categories/delete/${id}`, {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getCategories = (token) => {
  return new Promise((resolve, reject) => {
    instance
      .post('settings/categories', {
        token: token
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/*
 *  Auth-API's
 */
export const Login = (payload) => {
  return new Promise((resolve, reject) => {
    instance
      .post('login', payload)
      .then((resp) => {
        resolve(resp)
        if (resp.status === true) {
          const token = resp.data.auth_token
          instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const register = ({ name, email, password, password_Confirmation }) => {
  return new Promise((resolve, reject) => {
    instance
      .post('register', {
        Name: name,
        email,
        password,
        password_confirmation: password_Confirmation
      })
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const verify = (payload) => {
  return new Promise((resolve, reject) => {
    instance
      .post('verify_email', payload)
      .then((resp) => {
        resolve(resp.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const ForgotPassword = (payload) => {
  return new Promise((resolve, reject) => {
    instance
      .post('forget_password', payload)
      .then((resp) => {
        resolve(resp.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const ResetPassword = (payload) => {
  return new Promise((resolve, reject) => {
    instance
      .post('reset_password', payload)
      .then((resp) => {
        resolve(resp.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const UpdatePassword = (payload) => {
  return new Promise((resolve, reject) => {
    instance
      .post('UpdatePassword', payload)
      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
