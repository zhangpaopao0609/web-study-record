export default {
  namespaced: true,
  state: {
    count: 0
  },
  mutations: {
    ADD_COUNT: (state, { num = 1 }) =>  state.count += num
  },
  getters: {
    score: state => `score: ${state.count}`
  },
  actions: {
    // 复杂业务逻辑  类似于 controller
    // 比如 ajax 请求
    ASYNC_ADD: ({ commit, state }) => {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('ADD_COUNT',{});
          resolve({ ok: 1 });
        }, 1000)
      })
    }
  }
}