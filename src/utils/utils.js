import { isPast, format } from 'date-fns';
import i18n from '@/plugins/i18n';
import * as types from '@/store/mutation-types';
import { store } from '@/store';

// Catches error connection or any other error (checks if error.response exists)
export const handleError = (error, commit, reject) => {
  let errMsg = '';
  // Resets errors in store
  commit(types.SHOW_LOADING, false);
  commit(types.ERROR, null);

  // Checks if unauthorized
  if (error.response.status === 401) {
    store.dispatch('userLogout');
  } else {
    // Any other error
    errMsg = error.response
      ? error.response.data.errors.msg
        ? error.response.data.errors.msg
        : error.response.data.name
      : 'SERVER_TIMEOUT_CONNECTION_ERROR';
    setTimeout(() => (errMsg ? commit(types.ERROR, errMsg) : commit(types.SHOW_ERROR, false)), 0);
  }
  reject(error);
};

export const formatErrorMessages = (translationParent, msg) => {
  const errorArray = [];
  // Check for error msgs
  if (msg !== null) {
    const json = JSON.parse(JSON.stringify(msg));
    // If error message is an array, then we have mutiple errors
    if (Array.isArray(json)) {
      json.map((error) => {
        errorArray.push(i18n.t(`${translationParent}.${error.msg}`));
      });
    } else {
      // Single error
      errorArray.push(i18n.t(`${translationParent}.${msg}`));
    }
    return errorArray;
  }
  // all good, return null
  return null;
};

export const buildSuccess = (msg, commit, resolve, resolveParam = undefined) => {
  commit(types.SHOW_LOADING, false);
  commit(types.SUCCESS, null);
  setTimeout(() => (msg ? commit(types.SUCCESS, msg) : commit(types.SHOW_SUCCESS, false)), 0);
  commit(types.ERROR, null);
  resolve(resolveParam);
};

// Checks if tokenExpiration in localstorage date is past, if so then trigger an update
export const checkIfTokenNeedsRefresh = () => {
  // Checks if time set in localstorage is past to check for refresh token
  if (
    window.localStorage.getItem('token') !== null
    && window.localStorage.getItem('tokenExpiration') !== null
  ) {
    if (isPast(new Date(JSON.parse(window.localStorage.getItem('tokenExpiration')) * 1000))) {
      store.dispatch('refreshToken');
    }
  }
};
