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
    loginIn ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        const params = location.href.match(/[?|&]code=([^&]*)[&]?/)
        axios.get(`${apis.LOGIN3}?code=${params ? params[1] : ''}`).then(res => {
          console.log(res)
          const { SessionKey, EmployeeInfo, ErrorCode } = res
          if (ErrorCode !== 0) {
            dispatch('jumpToAuthority')
            reject(res)
          } else {
            localStorage.setItem('userInfo', JSON.stringify({SessionKey, EmployeeInfo}))
            commit('updateUserInfo', {SessionKey, EmployeeInfo})
            resolve(res)
          }
        }).catch(e => {
          reject(e)
        })
        // const res = {
        //   "ErrorCode": 0,
        //   "ErrorMessage": "invalid code, hint: [1607354958_54_c77b1acc1e7366d1429dc411a0741205], from ip: 180.167.11.228, more info at https://open.work.weixin.qq.com/devtool/query?e=40029",
        //   "SessionKey": '17797',
        //   "EmployeeInfo": {
        //     "Title": "43906018",
        //     "Positioin": null,
        //     "NameForGlobal": "Lifan Shi",
        //     "NameForLocal": "史 李凡",
        //     "LastNameForGlobal": "Shi",
        //     "FirstNameForGlobal": "Lifan",
        //     "LastnameForLocal": "史",
        //     "FirstNameForLocal": "李凡",
        //     "MiddleName": null,
        //     "PreferredName": null,
        //     "PersonnelAreaForEmployedBy": "6900",
        //     "PersonnelAreaTextForEmployedBy": "YCN",
        //     "OfficialNameForEmployeeBy": "Yokogawa China Co., Ltd.",
        //     "OfficialNameForEmployeeByNL": "横河電機（中国）有限公司",
        //     "PersonnelSubareaForEmployedBy": "1000",
        //     "PersonnelSubareaGlobaltextForEM": "Corporate Office",
        //     "PersonnelSubareaTextForEM": "上海事务所",
        //     "PersonnelAreaForWorkfor": "6900",
        //     "PersonnelAreaTextForWorkfor": "YCN",
        //     "OfficialNameForWorkFor": "Yokogawa China Co., Ltd.",
        //     "OfficialNameForWorkForNL": "横河電機（中国）有限公司",
        //     "PersonnelSubareaForWorkFor": "1000",
        //     "PersonnelSubareaGlobalTextWork": "Corporate Office",
        //     "PersonnelSubareaTextForWorkFor": "上海事务所",
        //     "ControllingAreaForEmployedBy": null,
        //     "CostCenterForEmployedBy": null,
        //     "ControllingAreaForWorkFor": "6900",
        //     "CostCenterForWorkFor": "0000000307",
        //     "MainOrSub": "1",
        //     "OrganizationalUnit": "10018203",
        //     "OrgShortName": "YCN Transformation Promotion Div.IT Management Dept",
        //     "OrgShortNameForNativeLanguage": "YCN 改革推进企画本部 IT管理部",
        //     "lineManagerFlag": null,
        //     "NonManagerFlag": null,
        //     "DirectOrIndirect": "2",
        //     "ExtensionNumber": "3006",
        //     "Email": "lifan.shi@cn.yokogawa.com",
        //     "ExternalNumber": "21-6239-6262",
        //     "LocationCode": null,
        //     "FaxNo": null,
        //     "CellularPhone": null,
        //     "CountryKey": "CN",
        //     "CreationDate": "20201126020005",
        //     "UpperOrganizationRank": "12",
        //     "IsUpperOrgManager": false,
        //     "Role": "员工"
        //   }
        // }
        // const { SessionKey, EmployeeInfo, ErrorCode } = res
        // if (ErrorCode != 0) {
        //   dispatch('jumpToAuthority')
        //   reject()
        // } else {
        //   localStorage.setItem('userInfo', JSON.stringify({SessionKey, EmployeeInfo}))
        //   commit('updateUserInfo', {SessionKey, EmployeeInfo})
        //   resolve(res)
        // }
      })
    },
    jumpToAuthority () {
      setTimeout(() => {
        const dom = document.createElement('a')
        dom.href = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=wwc8c054f48a782ad6&agentid=1000017&redirect_uri=https%3a%2f%2fwxwork.yokogawachina.com%2fJJF%2f&state=STATE'
        dom.style.display = 'none'
        dom.click()
      }, 5000)
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
    },
    getUserInfo (_, payload) {
      return new Promise((resolve, reject) => {
        axios.post(apis.GET_USER_INFO, payload).then(res => {
          if (!res) {
            window.$_toast({ props: { message: '用户不存在', duation: 3000 } })
            return reject(res)
          }
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
