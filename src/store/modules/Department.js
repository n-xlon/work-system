import axios from '../../config/axios'
import * as apis from '../../config/apis'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    getAllDepartment (_, payload) {
      return new Promise((resolve, reject) => {
        axios.get(apis.GET_ALL_DEPARTMENT, payload).then(res => {
          const { data } = res
          resolve(data)
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
