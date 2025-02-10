/* eslint-disable no-unused-vars */
import router from '@/router'
import { instance } from '@/services/api'
import { Login } from '@/services/api'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // state
  const Loading = ref(false)
  const token = ref(localStorage.getItem('access_token') || null)
  const returnUrl = ref(null)
  const userInfo = ref(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
  )

  // getters
  const isAuthenticated = computed(() => Boolean(token.value))

  //   actions
  async function login(payload) {
    return new Promise((resolve, reject) => {
      try {
        Login({
          email: payload.email,
          password: payload.password,
        })
          .then((response) => {
            
            if (response.data.user) {
              const userInfo = response.data.user
              token.value = response.data.auth_token
              userInfo.value = JSON.stringify(userInfo)
              localStorage.setItem('userInfo', JSON.stringify(userInfo))
              localStorage.setItem('access_token', response.data.auth_token)
            }
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      } catch (error) {
        reject(new Error(error))
      }
    })
  }
  // axios.defaults.headers.common["Authorization"] = token;

  async function logout() {
    userInfo.value = {}
    token.value = ''
    localStorage.removeItem('access_token')
    localStorage.removeItem('userInfo')
  }

  async function setLoading() {
    Loading.value = ! Loading.value
  }

  return { isAuthenticated, login, token,userInfo, returnUrl, logout ,Loading ,setLoading}
})
