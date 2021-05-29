<template>
  <div class="pa-5">
    <v-divider />

    <div class="d-flex justify-space-between">
      <v-icon>
        mdi-theme-light-dark
      </v-icon>
      <v-switch
        v-model="themeSwitch"
        color="secondary"
        @click.stop
      />
    </div>

    <div class="d-flex justify-space-between">
      <v-icon>mdi-translate</v-icon>
      <v-chip-group
        v-model="language"
        mandatory
      >
        <v-chip
          v-for="([locale, localeName], idx) in Object.entries(languages)"
          :key="idx"
          outlined
          @click.stop="setLangState(locale)"
        >
          {{ localeName }}
        </v-chip>
      </v-chip-group>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, reactive, ref, toRefs, watch,
} from '@vue/composition-api';

export default defineComponent({
  name: 'SettingShow',
  setup: (_, context) => {
    const state = reactive({
      languages: { jp: '日本語', en: 'English' },
      language: 0,
    });

    const themeSwitch = ref(false);

    const setThemeState = () => {
      localStorage.setItem('themeState', JSON.stringify(context.root.$vuetify.theme.dark));
    };

    watch(themeSwitch, () => {
      // eslint-disable-next-line no-param-reassign
      context.root.$vuetify.theme.dark = themeSwitch.value;
      setThemeState();
    });

    onMounted(() => {
      if (context.root.$root.$i18n.locale === 'jp') {
        state.language = 0;
      } else {
        state.language = 1;
      }

      themeSwitch.value = context.root.$vuetify.theme.dark;
    });

    const setLangState = (locale: string) => {
      // eslint-disable-next-line no-param-reassign
      context.root.$root.$i18n.locale = locale;
      localStorage.setItem('langState', JSON.stringify(locale));
    };

    return {
      ...toRefs(state),
      setLangState,
      setThemeState,
      themeSwitch,
    };
  },
});
</script>

<i18n>
{
  "en": {
    "darkMode": "Dark mode",
    "lang": "Language",
    "languages": ["jp", "en"]
  },
  "jp": {
    "darkMode": "ダークモード",
    "lang": "言語",
    "languages": ["日本語", "英語"]
  }
}
</i18n>
