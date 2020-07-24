import axios from 'axios'
import * as apis from '../../config/apis'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    getUserList (_, payload) {
      return new Promise((resolve, reject) => {
        axios.get(apis.GET_USER_LIST, payload).then(res => {
          const { data } = res
          resolve(data)
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
