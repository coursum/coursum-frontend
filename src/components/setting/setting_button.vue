<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        class="text-decoration-none mx-1"
        v-on="on"
        @click.prevent="attrs['aria-expanded'] = !attrs['aria-expanded']"
      >
        <v-icon
          color="grey darken-3"
        >
          mdi-cog-outline
        </v-icon>
      </v-btn>
    </template>

    <setting-show />
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import SettingShow from '@/components/setting/setting_show.vue';

export default Vue.extend({
  name: 'SettingButton',
  components: {
    SettingShow,
  },
});
</script>
