import axios from 'axios'

const host = import.meta.env.VITE_BASE_API_URL
const baseURL = `${host}`

export const instance = axios.create({
  baseURL: baseURL
})





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
  formData.append('token',token)

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
        token:token
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
        token:token
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



export const addDeliveryBoy = ({ token , transportation_type, note, image, name, email }) => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('image', image)
  formData.append('transportation_type', transportation_type)
  formData.append('note', note)
  formData.append('phone', email)
  formData.append(
    'token',token
  )

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

export const updateDeliveryBoy = ({ token,id, transportation_type, note, image, name, email }) => {

  const formData = new FormData()
  formData.append('name', name)
  formData.append('image', image)
  formData.append('transportation_type', transportation_type)
  formData.append('note', note)
  formData.append('phone', email)
  formData.append(
    'token',token
  )

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
        token:token
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
        token:token
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
export const addOrder = () => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .get('orders/add', {
        product_name: '',
        product_description: '',
        category_id: '',
        product_price: '',
        product_price_old: '',
        image: '',
        token: localStorage.getItem('access_token')
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
        token:token
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

export const register = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      instance
        .post('register', payload)
        .then((resp) => {
          resolve(resp.data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (err) {
      reject(new Error(err))
    }
  })
}

export const verify = (url, payload) => {
  return new Promise((resolve, reject) => {
    try {
      instance
        .post(url, payload)
        .then((resp) => {
          resolve(resp.data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (err) {
      reject(new Error(err))
    }
  })
}
export const ForgotPassword = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      instance
        .post('resend_verify', payload)
        .then((resp) => {
          resolve(resp.data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (err) {
      reject(new Error(err))
    }
  })
}

export const ResetPassword = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      instance
        .post('ResetPassword', payload)
        .then((resp) => {
          resolve(resp.data)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (err) {
      reject(new Error(err))
    }
  })
}
export const UpdatePassword = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      instance
        .post('UpdatePassword', payload)
        .then((resp) => {
          resolve(resp)
        })
        .catch((error) => {
          reject(error)
        })
    } catch (err) {
      reject(new Error(err))
    }
  })
}
