<template>
  <v-card
    width="50%"
    class="mx-auto my-12 pa-12"
  >
    <v-row>
      <v-col class="d-flex align-center">
        {{ $t("darkMode") }}
      </v-col>
      <v-col>
        <v-switch v-model="themeSwitch" />
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col class="d-flex align-center">
        {{ $t("lang") }}
      </v-col>
      <v-col>
        <v-chip-group
          v-model="language"
          mandatory
          active-class="blue--text"
        >
          <v-chip
            v-for="([locale, localeName], idx) in Object.entries(languages)"
            :key="idx"
            @click="setLang(locale)"
          >
            {{ localeName }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

  name: 'SettingPage',

  data: () => ({
    languages: { jp: '日本語', en: 'English' },
    language: 0,
    themeSwitch: false,
  }),
  watch: {
    themeSwitch() {
      this.$vuetify.theme.dark = this.themeSwitch;
      this.setDarkModeState();
    },
  },
  created() {
    if (this.$root.$i18n.locale === 'jp') {
      this.language = 0;
    } else {
      this.language = 1;
    }

    this.themeSwitch = this.$vuetify.theme.dark;
  },
  methods: {
    setLang(locale: string) {
      this.$root.$i18n.locale = locale;
    },
    setDarkModeState() {
      localStorage.setItem('darkModeState', JSON.stringify(this.$vuetify.theme.dark));
    },
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
