import './registerServiceWorker';
import VueCompositionApi from '@vue/composition-api';
import Vue from 'vue';

import App from './App.vue';
import i18n from './i18n';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);

new Vue({
  i18n,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
