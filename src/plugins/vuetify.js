import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import VuetifyConfirm from 'vuetify-confirm';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  lang: {
    locales: { es },
    current: 'es',
  },
  icons: {
    iconfont: 'mdi',
  },
});

Vue.use(VuetifyConfirm, { vuetify });

export default vuetify;
