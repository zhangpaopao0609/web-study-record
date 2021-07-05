const active = {
  namespaced: true,
  state: {
    activeInfo: {
      activeName: '',
      activeTime: [],
      activeSelectionStore: [],
      activeAddress: '',
      activeProduct: '',
    }
  },
  mutations: {
    UPDATE_ACTIVE: (state, val) => {
      state.activeInfo = { 
        ...state.activeInfo, 
        ...val 
      };
    },
    CLEAR_ACTIVE: (state) => {
      state.activeInfo = {
        activeName: '',
        activeTime: [],
        activeSelectionStore: [],
        activeAddress: '',
        activeProduct: '',
      };
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
};

export default active;