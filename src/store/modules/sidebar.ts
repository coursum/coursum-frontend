interface State {
  isVisible: boolean;
}

export default {
  namespaced: true,
  state: {
    isVisible: false,
  },
  mutations: {
    toggle(state: State, visibility: boolean) {
      state.isVisible = visibility;
    },
  },
};
