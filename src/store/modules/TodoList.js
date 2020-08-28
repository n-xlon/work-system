import axios from '../../config/axios'
import * as apis from '../../config/apis'

export default {
  namespaced: true,
  state: {
    showTodoListDetails: false
  },
  mutations: {
    updateType (state, type) {
      state.showTodoListDetails = type
    }
  },
  actions: {
    getTodoList (_, payload = {}) {
      return new Promise((resolve, reject) => {
        axios.post(apis.GET_TODO_LIST, JSON.stringify(payload)).then(data => {
          resolve(data)
        }).catch(e => {
          reject(e)
        })
      })
    },
    approvalTask (_, payload) {
      return new Promise((resolve, reject) => {
        axios.post(apis.APPROVAL_TASK, payload).then(res => {
          const { data } = res
          resolve(data)
        }).catch(e => {
          reject(e)
        })
      })
    },
    getCommunicateDetails ({state}, payload) {
      return new Promise((resolve, reject) => {
        axios.post(apis.GET_DETAILS, payload).then(res => {
          console.log(res)
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
