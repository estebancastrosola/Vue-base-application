import { addMinutes, format } from 'date-fns';
import * as types from '@/store/mutation-types';
import router from '@/router';
import api from '@/services/api/auth';
import { buildSuccess, handleError } from '@/utils/utils.js';

const MINUTES_TO_CHECK_FOR_TOKEN_REFRESH = 1440;

const actions = {
  userLogin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING, true);
      api
        .userLogin(payload)
        .then((response) => {
          if (response.status === 201) {
            window.localStorage.setItem('user', JSON.stringify(response.data.user));
            window.localStorage.setItem('token', JSON.stringify(response.data.accessToken));
            window.localStorage.setItem(
              'tokenExpiration',
              JSON.stringify(
                format(addMinutes(new Date(), MINUTES_TO_CHECK_FOR_TOKEN_REFRESH), 'X'),
              ),
            );
            commit(types.SAVE_USER, response.data.user);
            commit(types.SAVE_TOKEN, response.data.token);
            buildSuccess(
              null,
              commit,
              resolve,
              router.push({
                name: 'home',
              }),
            );
          }
        })
        .catch((error) => {
          handleError(error, commit, reject);
        });
    });
  },
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      api
        .refreshToken()
        .then((response) => {
          if (response.status === 200) {
            window.localStorage.setItem('token', JSON.stringify(response.data.token));
            window.localStorage.setItem(
              'tokenExpiration',
              JSON.stringify(
                format(addMinutes(new Date(), MINUTES_TO_CHECK_FOR_TOKEN_REFRESH), 'X'),
              ),
            );
            commit(types.SAVE_TOKEN, response.data.token);
            resolve();
          }
        })
        .catch((error) => {
          handleError(error, commit, reject);
        });
    });
  },
  userLogout({ commit }) {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('tokenExpiration');
    window.localStorage.removeItem('user');
    commit(types.LOGOUT);
    router.push({
      name: 'login',
    });
  },
};

const mutations = {
  [types.SAVE_TOKEN](state, token) {
    state.token = token;
    state.isTokenSet = true;
  },
  [types.LOGOUT](state) {
    state.user = null;
    state.token = null;
    state.isTokenSet = false;
  },
  [types.SAVE_USER](state, user) {
    state.user = user;
  },
};

const getters = {
  user: state => state.user,
  token: state => state.token,
  isTokenSet: state => state.isTokenSet,
};

const state = {
  user: null,
  token: JSON.parse(!!localStorage.getItem('token')) || null,
  isTokenSet: !!localStorage.getItem('token'),
};

export default {
  state,
  mutations,
  getters,
  actions,
};
