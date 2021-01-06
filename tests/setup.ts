import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';

Vue.use(Vuetify);
Vue.use(VueI18n);
Vue.use(Vuex);

const i18n = new VueI18n({
  locale: 'en',
});

const stateDatas = {
  idsInTimetable: ['Sample 1', 'Sample 2', 'Sample 3'],
};

const store = new Vuex.Store({
  state: stateDatas,
});

export { i18n, store };
