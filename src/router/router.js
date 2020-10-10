import router from './index'
import store from '../store'

router.beforeEach((to, from, next) => {
  if (!from.name && to.name) {
    Promise.all([store.dispatch('User/loginIn')]).then(() => {
      next()
    }).catch(() => {
      window.$_toast({ props: { message: '用户信息获取失败', duation: 3000 } })
      next()
    })
    // const userInfo = localStorage.getItem('userInfo')
    // if (userInfo) {
    //   const { SessionKey, EmployeeInfo } = JSON.parse(userInfo)
    //   store.commit('User/updateUserInfo', { SessionKey, EmployeeInfo })
    //   next()
    // } else {
    //   next('/login')
    // }
  } else {
    next()
  }
})
