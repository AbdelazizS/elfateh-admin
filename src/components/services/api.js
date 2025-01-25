import axios from 'axios'
const host = import.meta.env.VITE_BASE_API_URL
const baseURL = `${host}`

export const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})




export const getProducts = () => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post('product_category')

      .then((resp) => {
        resolve(resp)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
