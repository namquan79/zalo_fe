import axios from 'axios'
import store from '../store'
import router from '../router'

const baseDomain = 'https://zalooaub.chuyendoisoquocgia.net'
const baseAPI = `${baseDomain}/api`

const instance = axios.create({
  baseURL: baseAPI
})

instance.interceptors.request.use((request) => {
  if (request !== null && request.url) {
    const token = store.state.token
    const isLogin = request.url.startsWith('/auth/login') && request.method === 'post'

    if (token && !isLogin) {
      request.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete request.headers['Authorization'];
    }
  }

  return request
})

instance.interceptors.request.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status == 401) {
      router.push('login')
    }

    return Promise.reject(error)
  }
)

export default instance
