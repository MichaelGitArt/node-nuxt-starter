import authApi from '~/api/authApi';
import profileApi from '~/api/profileApi';

export default {
  // fetch user
  fetchUser({ dispatch }, reqOptions = {}) {
    return profileApi
      .getProfile(reqOptions)
      .then(({ data }) => {
        if (data.success) {
          return dispatch('setUser', data.user);
        }
      })
      .catch((err) => {
        dispatch('handleError', err, { root: true });
      });
  },

  // set user
  setUser({ commit }, user) {
    commit('setUser', user);
  },

  // logout
  logout({ commit, dispatch }) {
    authApi
      .logout()
      .then(({ data }) => {
        if (data.success) {
          if (this.app.router.currentRoute.path === '/') {
            return commit('setUser', null);
          }

          this.app.router.push('/', () => {
            commit('setUser', null);
          });
        }
      })
      .catch((err) => {
        dispatch('handleError', err, { root: true });
      });
  },
};
