import * as types from '@/store/mutation-types';

const state = {
  showNavigationDrawer: null,
};

const actions = {
  changeShowNavicationDrawer({ commit }, payload) {
    commit(types.CHANGE_SHOW_NAVIGATION_DRAWER, payload);
  },
};

const mutations = {
  [types.CHANGE_SHOW_NAVIGATION_DRAWER](state, value) {
    state.showNavigationDrawer = value;
  },
};

export default {
  state,
  actions,
  mutations,
};
