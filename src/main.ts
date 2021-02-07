import './registerServiceWorker';
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import App from './App.vue';
import i18n from './i18n';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
