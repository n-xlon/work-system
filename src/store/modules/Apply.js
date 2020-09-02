import axios from '../../config/axios'
import * as apis from '../../config/apis'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    getApplyList (_, payload) {
      return new Promise((resolve, reject) => {
        axios.post(apis.GET_APPLY_LIST, payload).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
