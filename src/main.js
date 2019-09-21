import Vue from 'vue';
import i18n from '@/plugins/i18n';
import App from '@/App.vue';
import router from '@/router';
import { store } from '@/store';
import '@/plugins/veevalidate';
import '@/plugins/axios';
import '@/plugins/common';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
