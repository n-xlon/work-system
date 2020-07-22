import axios from 'axios'
import store from '../store'

const service = axios.create({
  timeout: 50000
})

service.interceptors.request.use(config => {
  const SessionKey = store.state.SessionKey
  if (!config.headers['SessionKey']) {
    config.headers['SessionKey'] = SessionKey
  }
  return config
}, error => {
  console.error(error)
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const { status } = response.data
  if (status !== 200) {
    console.error('error:', response.data)
    return Promise.reject(response)
  }
})

export default service
