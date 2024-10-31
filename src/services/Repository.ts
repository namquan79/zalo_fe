import axios from 'axios'
import store from '../store'
import router from '../router'

const baseDomain = ''
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
      console.log('@@@@@@@@@ token response' + JSON.stringify(response));
      console.log('@@@@@@@@@ token response status' + JSON.stringify(response));
      return response
    },
    async (error) => {
      console.log('@@@@@@@@@ token status');
      console.log('@@@@@@@@@ token status' + error.response.status);
      if (error.response.status == 401) {
          store.dispatch('clearToken');
          store.dispatch('clearPermission');
        router.push('relogin');
      }

      return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
      console.log('@@@@@@@@@AAA token response status' + JSON.stringify(response));
      return response
    },
    async (error) => {
      console.log('@@@@@@@@@AAA token status');
      console.log('@@@@@@@@@AAAA token status' + error.response.status);
      if (error.response.status == 401) {
          store.dispatch('clearToken');
          store.dispatch('clearPermission');
        router.push('relogin');
      }

      return Promise.reject(error)
    }
)

export default instance
