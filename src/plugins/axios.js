import Vue from 'vue';
import axios from 'axios';

// eslint-disable-next-line no-shadow
Plugin.install = (Vue) => {
  // eslint-disable-next-line no-param-reassign
  Vue.axios = axios;
  window.axios = axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios;
      },
    },
    $axios: {
      get() {
        return axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
