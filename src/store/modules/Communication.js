import axios from '../../config/axios'
import * as apis from '../../config/apis'

const initState = {
  communicationData: {
    department: '',
    YCNPersonName: '',
    content: [],
    otherText: '',
    participantsInfo: {
      bussiness: '',
      num: '',
      person: [],
      startTime: '',
      endTime: '',
      correntArea: '',
      reason: ''
    },
    budgetAmount: {
      totalMoney: '',
      totalNum: '',
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
      state.communicationData = { ...initState }
    }
  },
  actions: {
    submitCommunicationData ({ state, rootState }, payload) {
      return new Promise((resolve, reject) => {
        const { department, YCNPersonName, content, otherText, participantsInfo, budgetAmount } = state.communicationData
        const { currentUser } = rootState.User
        let data = {
          ApplicantName: currentUser.NameForLocal,
          PersonnelNumberOfApplicant: currentUser.Title,
          Department: department,
          PersonnelNumberOfUsher: '1',
          UsherName: YCNPersonName,
          Role: '',
          OtherUsher: '',
          GroupAttendant: '',
          Category: content.join(','),
          OtherCategroyDescription: otherText,
          Company: participantsInfo.bussiness,
          NumberOfClient: participantsInfo.num,
          ClientName: participantsInfo.person.length ? participantsInfo.person[0].name : '',
          ClientDepartment: participantsInfo.person.length ? participantsInfo.person[0].company : '',
          ClientPosition: participantsInfo.person.length ? participantsInfo.person[0].position : '',
          MoreClients: JSON.stringify(participantsInfo.person),
          StartDate: participantsInfo.startTime || '',
          EndDate: participantsInfo.endTime || '',
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
        axios.post(apis.SUBMIT_COMMUNICATION_DATA, data).then(res => {
          const { data } = res
          resolve(data)
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
