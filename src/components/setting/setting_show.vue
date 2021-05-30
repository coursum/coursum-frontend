<template>
  <div class="pa-5">
    <v-divider />

    <div class="d-flex justify-space-between">
      <v-icon>mdi-theme-light-dark</v-icon>
      <v-switch v-model="isDark"
                color="secondary"
                @click.stop
      />
    </div>

    <div class="d-flex justify-space-between">
      <v-icon>mdi-translate</v-icon>
      <v-chip-group v-model="locale" mandatory>
        <v-chip outlined value="jp">
          日本語
        </v-chip>
        <v-chip outlined value="en">
          English
        </v-chip>
      </v-chip-group>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-param-reassign */
import { defineComponent, ref, watch } from '@vue/composition-api';

import useStorage from '@/composables/useStorage';

export default defineComponent({
  name: 'SettingShow',
  setup: (_, { root: { $vuetify, $i18n } }) => {
    const { setItem } = useStorage(localStorage);

    const isDark = ref($vuetify.theme.dark);

    watch(isDark, () => {
      $vuetify.theme.dark = isDark.value;
      setItem('vuetify.theme.dark', isDark.value);
    });

    const locale = ref($i18n.locale);

    watch(locale, () => {
      $i18n.locale = locale.value;
      setItem('i18n.locale', locale.value);
    });

    return {
      isDark,
      locale,
    };
  },
});
</script>
