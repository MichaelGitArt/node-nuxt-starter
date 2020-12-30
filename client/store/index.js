export const state = () => ({});

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const reqOptions = {};
    if (req) {
      reqOptions.headers = req.headers;
    }

    await dispatch('auth/fetchUser', reqOptions);
  },
  handleError(_, error) {
    const errorMessage = this.app.i18n.t(
      'errors.' + ((error && error.code) || 'UNEXPECTED_ERROR')
    );
    if (process.client) {
      this._vm.$toast.error(errorMessage);
    } else {
      // eslint-disable-next-line no-console
      console.log(errorMessage);
    }
  },
};

export const getters = {
  user(state) {
    return state.auth.user;
  },
};
