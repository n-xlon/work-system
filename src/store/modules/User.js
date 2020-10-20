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
    // loginIn ({ commit }, payload) {
    //   return new Promise((resolve, reject) => {
    //     const params = location.href.match(/[?|&]code=([^&]*)[&]?/)
    //     axios.post(apis.LOGIN, { code: '' }).then(res => {
    //       const { SessionKey, EmployeeInfo } = res
    //       localStorage.setItem('userInfo', JSON.stringify({ SessionKey, EmployeeInfo }))
    //       commit('updateUserInfo', { SessionKey, EmployeeInfo })
    //       resolve(res)
    //     }).catch(e => {
    //       reject(e)
    //     })
    //   })
    // },
    loginIn ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        const params = location.href.match(/[?|&]code=([^&]*)[&]?/)
        axios.get(`${apis.LOGIN3}?code=${params ? params[1] : ''}`).then(res => {
          console.log(res)
          const { SessionKey, EmployeeInfo, ErrorCode } = res
          if (ErrorCode != 0) {
            dispatch('jumpToAuthority')
            reject()
          } else {
            localStorage.setItem('userInfo', JSON.stringify({SessionKey, EmployeeInfo}))
            commit('updateUserInfo', {SessionKey, EmployeeInfo})
            resolve(res)
          }
        }).catch(e => {
          reject(e)
        })
      })
    },
    jumpToAuthority () {
      const dom = document.createElement('a')
      dom.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwc8c054f48a782ad6&redirect_uri=www.ccodding.top%3a2000&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
      document.body.appendChild(dom)
      dom.click()
      document.body.removeChild(dom)
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
