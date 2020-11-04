import axios from '../../config/axios'
import * as apis from '../../config/apis'

const initState = {
  communicationData: {
    department: '',
    YCNPersonName: '',
    OtherUsher: '',
    GroupAttendant: '',
    content: [],
    otherText: '',
    participantsInfo: {
      bussiness: '',
      num: '',
      person: [],
      startTime: '',
      endTime: '',
      correntArea: '国内',
      reason: '',
      OverseasPlace: '',
      requestType: ''
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
    ...JSON.parse(JSON.stringify(initState))
  },
  mutations: {
    updateCommunicationData (state, data) {
      state.communicationData = { ...state.communicationData, ...data }
    },
    resetCommunication (state) {
      state.communicationData = { ...JSON.parse(JSON.stringify(initState.communicationData)) }
    }
  },
  actions: {
    submitCommunicationData ({ state, rootState }, payload) {
      return new Promise((resolve, reject) => {
        const { department, YCNPersonName, OtherUsher, GroupAttendant, content, otherText, participantsInfo, budgetAmount } = state.communicationData
        const { currentUser } = rootState.User
        let data = {
          ApplicantName: currentUser.NameForLocal,
          PersonnelNumberOfApplicant: currentUser.Title,
          Department: currentUser.CostCenterForWorkFor ? currentUser.CostCenterForWorkFor.slice(currentUser.CostCenterForWorkFor.length - 4) : '',
          PersonnelNumberOfUsher: currentUser.Title,
          UsherName: YCNPersonName,
          Role: currentUser.Role || '',
          OtherUsher: OtherUsher,
          GroupAttendant: GroupAttendant,
          Category: content.join(','),
          OtherCategroyDescription: otherText,
          Company: participantsInfo.bussiness,
          NumberOfClient: participantsInfo.num,
          ClientName: participantsInfo.person.length ? participantsInfo.person[0].name : '',
          ClientDepartment: participantsInfo.person.length ? participantsInfo.person[0].company : '',
          ClientPosition: participantsInfo.person.length ? participantsInfo.person[0].position : '',
          MoreClients: `${JSON.stringify(participantsInfo.person).replace(/\"/g,"\"")}`,
          StartDate: participantsInfo.startTime || '',
          EndDate: participantsInfo.endTime || '',
          Purpose: participantsInfo.reason,
          Place: participantsInfo.correntArea,
          OverseasPlace: participantsInfo.OverseasPlace,
          Amount: +budgetAmount.totalMoney,
          NumberOfPeople: +budgetAmount.totalNum,
          PerCapital: +budgetAmount.average,
          DetailOfBudget: `${JSON.stringify(budgetAmount.details).replace(/\"/g,"\"")}`,
          Remark: '',
          RequestType: participantsInfo.requestType
        }
        axios.post(apis.SUBMIT_COMMUNICATION_DATA, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          const { data } = res
          resolve(data)
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
