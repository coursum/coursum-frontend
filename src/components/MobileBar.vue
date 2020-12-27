<template>
  <div>
    <!-- top bar for mobile -->
    <v-app-bar
      color="white"
      app
      dense
    >
      <v-btn
        icon
        @click.stop="drawer = !drawer"
      >
        <v-icon color="secondary">
          mdi-view-headline
        </v-icon>
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
          <v-icon color="secondary">
            mdi-grid
          </v-icon>
        </v-btn>
      </router-link>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            class="text-decoration-none"
            v-on="on"
            @click.prevent="attrs['aria-expanded'] = !attrs['aria-expanded']"
          >
            <v-icon color="secondary">
              mdi-account-circle
            </v-icon>
          </v-btn>
        </template>
        <settings />
      </v-menu>
    </v-app-bar>
    <!-- /top bar for mobile -->

    <!-- side bar for mobile -->
    <v-navigation-drawer
      v-model="drawer"
      app
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
import Settings from '@/components/Settings.vue';

export default Vue.extend({

  name: 'TopBar',
  components: {
    SearchBar,
    CategoryList,
    Settings,
  },
  data() {
    return {
      drawer: null,
    };
  },
});
</script>
