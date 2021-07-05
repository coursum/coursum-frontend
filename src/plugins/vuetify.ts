import Vue from 'vue';
import type { UserVuetifyPreset } from 'vuetify';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

const options: UserVuetifyPreset = {
  theme: {
    options: {
      customProperties: true,
    },
    dark: false,
    themes: {
      light: {
        word: colors.grey.darken4,
        caption: colors.grey.darken3,

        lightgrey: colors.grey.lighten4,
        darkgrey: colors.grey.lighten3,

        pg: colors.grey.darken1,

        primary: colors.grey.lighten5,
        secondary: '#BDBDBD',
        accent: colors.shades.white,
        info: colors.shades.white,
        warning: colors.shades.white,
        error: colors.shades.white,
        success: colors.shades.white,
      },
      dark: {
        word: colors.grey.lighten5,
        caption: colors.grey.lighten4,

        lightgrey: colors.grey.darken4,
        darkgrey: colors.grey.darken3,

        pg: colors.grey.darken1,

        primary: colors.grey.darken4,
        secondary: '#757575',
        accent: '#b2b2b2',
        info: colors.shades.white,
        warning: colors.shades.white,
        error: colors.shades.white,
        success: colors.shades.white,
      },
    },
  },
};

Vue.use(Vuetify);

export default new Vuetify(options);
