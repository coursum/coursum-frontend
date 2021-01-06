<template>
  <v-app-bar
    app
    color="white"
  >
    <v-btn
      icon
      @click="goBack"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-spacer />

    <search-input />

    <v-spacer />

    <account-button />
    <setting-button />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchInput from '@/components/search/search_input.vue';
import AccountButton from '@/components/course/account_button.vue';
import SettingButton from '@/components/setting/setting_button.vue';

export default Vue.extend({
  name: 'TopBar',
  components: {
    SearchInput,
    AccountButton,
    SettingButton,
  },

  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    },
  },
});
</script>
