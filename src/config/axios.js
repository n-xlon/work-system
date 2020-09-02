import axios from 'axios'
import store from '../store'

const options = {}
if (process.env.NODE_ENV === 'production') {
  options.baseURL = 'https://appsrv.yokogawachina.com:8585'
}

const service = axios.create({
  ...options,
  timeout: 50000
})

service.interceptors.request.use(config => {
  const SessionKey = store.state.User.SessionKey
  config.headers['Content_Type'] = 'application/x-www-form-urlencoded'
  if (!config.headers.SessionKey) {
    config.headers.SessionKey = SessionKey
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const { status, data } = response
  if (status !== 200 || (status === 200 && Object.prototype.toString.call(data) === '[object String]')) {
    window.$_toast({ props: {message: response.data, duation: 3000}})
    return Promise.reject(response)
  }
  return Promise.resolve(response.data)
}, error => {
  const { status, data } = error.response
  if (status === 403) {
    if ('ErrorCode' in data && [1001, 1002, 1003].includes(data.ErrorCode)) {
      localStorage.removeItem('userInfo')
      window.$_toast({ props: {message: data.ErrorMessage, duation: 3000}})
      window.vm.$router.push('/login')
    }
  } else {
    if ('ErrorCode' in data && 'ErrorMessage' in data) {
      window.$_toast({ props: {message: data.ErrorMessage, duation: 3000}})
    } else {
      window.$_toast({ props: {message: data.Message || error, duation: 3000}})
    }
  }
  return Promise.reject(error.response)
})

export default service
