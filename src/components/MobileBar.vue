<template>
  <div
    v-if="$vuetify.breakpoint.mdAndDown"
  >
    <!-- top bar for mobile -->
    <v-app-bar
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

    <!-- side bar for mobile -->
    <v-navigation-drawer
      v-model="drawerMobile"
      color="secondary"
      absolute
      temporary
    >
      <v-list
        class="grow"
        dense
      >
        <category-list />
      </v-list>
    </v-navigation-drawer>
    <!-- /side bar for mobile -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import CategoryList from '@/components/SideBar/CategoryList.vue';

export default Vue.extend({

  name: 'TopBar',
  components: {
    SearchBar,
    CategoryList,
  },
  data() {
    return {
      drawerMobile: null,
      categoryLists: [
        { research: [] },
        {
          fundamental: ['introductory', 'language-communication', 'data-science',
            'information-technology', 'wellness', 'interdisciplinary'],
        },
        { advanced: ['series-of-policy-management', 'series-of-environment-and-information-studies'] },
        {
          others: ['special-subjects', 'specialized-subjects-in-teacher-training',
            'courses-offered-at-research-institutes-on-sfc',
            'courses-offered-at-other-faculties', 'optional-subjects'],
        },
      ],
    };
  },
  methods: {
    forward() {
      this.$router.go(-1);
    },
  },
});
</script>
