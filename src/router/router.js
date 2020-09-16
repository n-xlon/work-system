import router from './index'
import store from '../store'

router.beforeEach((to, from, next) => {
  store.dispatch('User/getWxToken')
  if (!from.name && to.name && to.name !== 'Login') {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      const { SessionKey, EmployeeInfo } = JSON.parse(userInfo)
      store.commit('User/updateUserInfo', { SessionKey, EmployeeInfo })
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
