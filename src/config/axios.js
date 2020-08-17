import axios from 'axios'
import store from '../store'

const service = axios.create({
  timeout: 50000
})

service.interceptors.request.use(config => {
  console.log(config, 222)
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
  if (status !== 200) {
    window.$_toast({ props: {message: response.data}})
    return Promise.reject(response)
  }
  return Promise.resolve(response.data)
}, err => {
  console.log(err, 111)
  window.$_toast({ props: {message: err}})
  return Promise.reject(err)
})

export default service
