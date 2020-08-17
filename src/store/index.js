import Vue from 'vue'
import Vuex from 'vuex'
import TodoList from './modules/TodoList'
import Apply from './modules/Apply'
import Department from './modules/Department'
import Communication from './modules/Communication'
import User from './modules/User'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    User,
    Communication,
    TodoList,
    Apply,
    Department
  }
})
