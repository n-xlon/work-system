export default {
  namespaced: true,
  state: {
    showTodoListDetails: false
  },
  mutations: {
    updateType (state, type) {
      state.showTodoListDetails = type
    }
  }
}
