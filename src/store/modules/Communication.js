import axios from 'axios'
import * as apis from '../../config/apis'

const initState = {
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
}

export default {
  namespaced: true,
  state: {
    ...initState
  },
  mutations: {
    updateCommunicationData (state, data) {
      state.communicationData = { ...state.communicationData, ...data }
    },
    resetCommunication (state) {
      state.communicationData = { ...initState.communicationData }
    }
  },
  actions: {
    submitCommunicationData (_, payload) {
      return new Promise((resolve, reject) => {
        axios.get(apis.SUBMIT_COMMUNICATION_DATA, payload).then(res => {
          const { data } = res
          resolve(data)
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
