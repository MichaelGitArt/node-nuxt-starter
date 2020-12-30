export default {
  setDrawer({ commit }, drawer) {
    commit('setDrawer', drawer);
  },
  toggleDrawer({ commit, state }) {
    commit('setDrawer', !state.drawer);
  },
};
