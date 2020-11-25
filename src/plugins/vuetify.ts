import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        white: colors.shades.white,
        black: '#5D6B79',
        primary: '#2C3E50',
        secondary: '#405061',
        accent: colors.shades.white,
      },
      dark: {
        white: '#121212',
        black: '#b2b2b2',
        primary: colors.grey.darken4,
        secondary: colors.grey.darken3,
        accent: '#b2b2b2',
      },
    },
  },
});
