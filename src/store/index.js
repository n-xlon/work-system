import Vue from 'vue'
import Vuex from 'vuex'
import TodoList from './TodoList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    communicationData: {
      department: '',
      YCNPersonName: '',
      content: '',
      otherText: '',
      participantsInfo: {
        bussiness: '',
        num: 0,
        person: [],
        startTime: '',
        endTime: '',
        correntArea: '',
        reason: ''
      },
      budgetAmount: {
        totalMoney: 0,
        totalNum: 0,
        average: '',
        details: []
      }
    }
  },
  mutations: {
    updateCommunicationData (state, data) {
      state.communicationData = { ...state.communicationData, ...data }
    }
  },
  actions: {
  },
  modules: {
    TodoList
  }
})
