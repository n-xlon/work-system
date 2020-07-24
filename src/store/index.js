import Vue from 'vue'
import Vuex from 'vuex'
import TodoList from './modules/TodoList'
import Apply from './modules/Apply'
import Department from './modules/Department'
import Communication from './modules/Communication'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Communication,
    TodoList,
    Apply,
    Department
  }
})
