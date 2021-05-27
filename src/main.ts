import './registerServiceWorker';
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ja';
import locale from 'element-ui/lib/locale';
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import router from './router';
import store from './store';
import i18n from './i18n';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

// configure language
// https://element.eleme.io/#/en-US/component/i18n#internationalization
locale.use(lang);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
