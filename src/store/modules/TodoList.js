import axios from 'axios'
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
    getTodoList (_, payload) {
      return new Promise((resolve, reject) => {
        axios.get(apis.GET_TODO_LIST, payload).then(res => {
          const { data } = res
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
    }
  }
}
