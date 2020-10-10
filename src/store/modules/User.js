import axios from '../../config/axios'
import * as apis from '../../config/apis'

export default {
  namespaced: true,
  state: {
    currentUser: null,
    SessionKey: null
  },
  mutations: {
    updateUserInfo (state, params) {
      state.currentUser = params.EmployeeInfo
      state.SessionKey = params.SessionKey
    }
  },
  actions: {
    loginIn ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const params = location.href.match(/[?|&]code=(\S)+[&|]/)
        axios.post(apis.LOGIN, { code: '' }).then(res => {
          const { SessionKey, EmployeeInfo } = res
          localStorage.setItem('userInfo', JSON.stringify({ SessionKey, EmployeeInfo }))
          commit('updateUserInfo', { SessionKey, EmployeeInfo })
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    login3 ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const params = location.href.match(/[?|&]code=(\S)+[&|]/)
        axios.get(`${apis.LOGIN3}?code=${params ? params[1] : ''}`).then(res => {
          console.log(res)
          const { SessionKey, EmployeeInfo } = res
          localStorage.setItem('userInfo', JSON.stringify({ SessionKey, EmployeeInfo }))
          commit('updateUserInfo', { SessionKey, EmployeeInfo })
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
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
