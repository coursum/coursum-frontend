import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: false,
    themes: {
      light: {
        cover: '#f7f7f7',
        white: colors.shades.white,
        black: '#757575',
        primary: '#424242',
        secondary: '#BDBDBD',
        accent: colors.shades.white,
      },
      dark: {
        cover: '#2a2a2a',
        white: '#121212',
        black: '#b2b2b2',
        primary: '#E0E0E0',
        secondary: '#757575',
        accent: '#b2b2b2',
      },
    },
  },
});
