import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/workflow',
    // name: 'WorkFlow',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "WorkFlow" */ '../views/WorkFlow/index.vue'),
    children: [
      {
        path: '',
        name: 'WorkFlow',
        component: () => import(/* webpackChunkName: "WorkFlow" */ '../views/WorkFlow/WorkFlow.vue')
      },
      {
        path: 'communication',
        name: 'Communication',
        component: () => import('../views/WorkFlow/Communication.vue')
      },
      {
        path: 'department',
        name: 'Department',
        component: () => import('../components/Department.vue')
      },
      {
        path: 'freeContent',
        name: 'FreeContent',
        component: () => import('../views/WorkFlow/Communication/FreeContent.vue')
      },
      {
        path: 'participants',
        name: 'Participants',
        component: () => import('../views/WorkFlow/Communication/Participants.vue')
      },
      {
        path: 'costList',
        name: 'CostList',
        component: () => import('../views/WorkFlow/Communication/CostList.vue')
      }
    ]
  },
  {
    path: '/todoList',
    name: 'TodoList',
    component: () => import('../views/TodoList/TodoList.vue')
  },
  {
    path: '/myApply',
    name: 'MyApply',
    component: () => import('../views/Apply/Apply.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
