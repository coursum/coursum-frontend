<template>
  <div>
    <!-- top bar-->
    <v-app-bar
      v-if="!isIndexPage() && $vuetify.breakpoint.lgAndUp"
      color="white"
      app
    >
      <v-btn
        icon
        @click="forward()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <SearchBar />
    </v-app-bar>
    <!-- /top bar-->

    <!-- top bar for mobile -->
    <v-app-bar
      v-else-if="$vuetify.breakpoint.mdAndDown"
      color="white"
      app
    >
      <v-btn
        icon
        @click.stop="drawerMobile = !drawerMobile"
      >
        <v-icon color="black">
          mdi-view-headline
        </v-icon>
      </v-btn>

      <v-btn
        v-if="!isIndexPage()"
        icon
        @click="forward()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <div
        style="width: 65%; height: 100%"
        class="mx-auto d-flex align-center my-0"
      >
        <SearchBar />
      </div>

      <router-link
        to="/timetable"
        class="text-decoration-none"
      >
        <v-btn icon>
          <v-icon color="black">
            mdi-grid
          </v-icon>
        </v-btn>
      </router-link>

      <router-link
        to="/setting"
        class="text-decoration-none"
      >
        <v-btn icon>
          <v-icon color="black">
            mdi-account-circle
          </v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>
    <!-- /top bar for mobile -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '@/components/SearchBar.vue';

export default Vue.extend({

  name: 'TopBar',
  components: {
    SearchBar,
  },
  data: () => ({
    drawerMobile: null,
  }),
  methods: {
    isIndexPage() {
      if (this.$route.path === '/') {
        return true;
      }
      return false;
    },
    forward() {
      this.$router.go(-1);
    },
  },
});
</script>
