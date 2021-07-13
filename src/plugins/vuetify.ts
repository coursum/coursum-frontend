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
        stripedTableOddRow: colors.grey.lighten4,
        stripedTableEvenRow: colors.grey.lighten3,
        menuBackground: colors.grey.lighten4,
      },
      dark: {
        stripedTableOddRow: colors.grey.darken4,
        stripedTableEvenRow: colors.grey.darken3,
        menuBackground: colors.grey.darken4,
      },
    },
  },
};

Vue.use(Vuetify);

export default new Vuetify(options);
