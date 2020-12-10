<template>
  <div v-if="$vuetify.breakpoint.lgAndUp">
    <!-- side bar -->
    <v-navigation-drawer
      v-model="drawer"
      color="secondary"
      :mini-variant="mini"
      mini-variant-width="40"
      permanent
      app
    >
      <v-row
        class="fill-height"
        no-gutters
      >
        <v-navigation-drawer
          color="primary"
          mini-variant
          mini-variant-width="40"
          permanent
        >
          <div
            style="height: 100%"
            class="d-flex flex-column justify-space-between align-center"
          >
            <div class="d-flex flex-column align-center">
              <v-btn
                icon
                @click.stop="
                  mini = !mini;
                  type = 0;
                "
              >
                <v-icon color="accent">
                  mdi-view-headline
                </v-icon>
              </v-btn>

              <router-link
                to="/"
                class="text-decoration-none"
              >
                <v-btn icon>
                  <v-icon color="accent">
                    mdi-home
                  </v-icon>
                </v-btn>
              </router-link>

              <router-link
                to="/setting"
                class="text-decoration-none"
              >
                <v-btn icon>
                  <v-icon color="accent">
                    mdi-account-circle
                  </v-icon>
                </v-btn>
              </router-link>

              <router-link
                to="/timetable"
                class="text-decoration-none"
              >
                <v-btn icon>
                  <v-icon color="accent">
                    mdi-grid
                  </v-icon>
                </v-btn>
              </router-link>
            </div>

            <div class="d-flex flex-column align-center">
              <router-link
                to="/"
                class="text-decoration-none"
              >
                <v-btn icon>
                  <v-icon color="accent">
                    mdi-view-module
                  </v-icon>
                </v-btn>
              </router-link>

              <router-link
                to="/headline"
                class="text-decoration-none"
              >
                <v-btn icon>
                  <v-icon color="accent">
                    mdi-view-headline
                  </v-icon>
                </v-btn>
              </router-link>

              <router-link
                to="/carousel"
                class="text-decoration-none"
              >
                <v-btn icon>
                  <v-icon color="accent">
                    mdi-view-carousel
                  </v-icon>
                </v-btn>
              </router-link>
            </div>
          </div>
        </v-navigation-drawer>

        <v-list
          v-if="type == 0"
          class="grow"
          dense
          :class="{ 'd-none': mini }"
        >
          <category-list />
        </v-list>
      </v-row>
    </v-navigation-drawer>
    <!-- /side bar -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CategoryList from '@/components/SideBar/CategoryList.vue';

export default Vue.extend({

  name: 'SideBar',
  components: {
    CategoryList,
  },
  data() {
    return {
      drawer: null,
      drawerMobile: null,
      mini: true,
      type: 0,

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
