import axios from '../../config/axios'
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
    submitCommunicationData ({ state }, payload) {
      return new Promise((resolve, reject) => {
        const { department, YCNPersonName, content, otherText, participantsInfo, budgetAmount } = state
        let data = {
          ApplicantName: YCNPersonName,
          PersonnelNumberOfApplicant: '',
          Department: department,
          PersonnelNumberOfUsher: '',
          UsherName: '',
          Role: '',
          OtherUsher: '',
          GroupAttendant: '',
          Category: '',
          OtherCategroyDescription: '',
          Company: '',
          NumberOfClient: participantsInfo.num,
          ClientName: '',
          ClientDepartment: '',
          ClientPosition: '',
          MoreClients: JSON.stringify(participantsInfo.person),
          StartDate: participantsInfo.startTime,
          EndDate: participantsInfo.endTime,
          Purpose: participantsInfo.reason,
          Place: participantsInfo.correntArea,
          OverseasPlace: '',
          Amount: budgetAmount.totalMoney,
          NumberOfPeople: budgetAmount.totalNum,
          PerCapital: budgetAmount.average,
          DetailOfBudget: JSON.stringify(budgetAmount.details),
          Remark: '',
          RequestType: ''
        }
        axios.get(apis.SUBMIT_COMMUNICATION_DATA, data).then(res => {
          const { data } = res
          resolve(data)
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
