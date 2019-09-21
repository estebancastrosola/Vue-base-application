import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueI18n from 'vue-i18n';

import VeeValidate from 'vee-validate';
import en from 'vee-validate/dist/locale/en';
import es from 'vee-validate/dist/locale/es';
import Home from '@/components/Home.vue';

const localVue = createLocalVue();
localVue.use(VueI18n);

const messages = {
  es: {
    common: {
      HELLO: 'Hola',
    },
  },
};
const i18n = new VueI18n({
  locale: 'es', // set locale,
  messages,
});

const veeValidateConfig = {
  locale: JSON.parse(localStorage.getItem('locale')) || 'en',
  dictionary: {
    en,
    es,
  },
};

localVue.use(VeeValidate, veeValidateConfig);

// Probamos a realizar una traducción al español de un elemento cualquiera de la web
describe('Locale', () => {
  it('i18n works fine', () => {
    const wrapper = shallowMount(Home, { i18n, localVue });
    const wellcomeText = wrapper.find('#wellcomeMsg').text();
    expect(wellcomeText).toMatch(messages.es.common.HELLO);
  });
});
