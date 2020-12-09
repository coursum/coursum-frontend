<template>
  <div>
    <!-- side bar -->
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.lgAndUp"
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
          <v-list-item>
            <v-list-item-content>
              <router-link
                to="/"
                class="text-decoration-none"
              >
                <v-list-item-title
                  style="color: #cacfd3"
                  class="font-weight-black"
                >
                  {{ $t("indexPage") }}
                </v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>

          <v-divider />

          <template v-for="(key, index) in Object.keys($t('categories'))">
            <v-list-group
              v-if="Object.keys($t('categories')[key]).length > 0"
              :key="`first-${index}`"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title
                    style="color: #cacfd3"
                    class="font-weight-black"
                  >
                    {{ key }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="(item, idx) in $t('categories')[key]"
                :key="idx"
                links
              >
                <v-list-item-content class="pl-5">
                  <router-link
                    :to="
                      '/category' +
                        '/' +
                        Object.keys(categoryLists[index])[0] +
                        '/' +
                        categoryLists[index][
                          Object.keys(categoryLists[index])[0]
                        ][idx]
                    "
                    class="text-decoration-none"
                  >
                    <v-list-item-title
                      style="color: #cacfd3; width: 160px"
                      class="font-weight-black text-truncate"
                    >
                      {{ item }}
                    </v-list-item-title>
                  </router-link>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <v-list-item
              v-else
              :key="`second-${index}`"
              link
            >
              <v-list-item-content>
                <router-link
                  :to="'/category' + '/' + Object.keys(categoryLists[index])[0]"
                  class="text-decoration-none"
                >
                  <v-list-item-title
                    style="color: #cacfd3; width: 160px"
                    class="font-weight-black text-truncate"
                  >
                    {{ key }}
                  </v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-divider />

          <v-list-item>
            <v-list-item-content>
              <router-link
                to="/"
                class="text-decoration-none"
              >
                <v-list-item-title
                  style="color: #cacfd3"
                  class="font-weight-black"
                >
                  教員一覧
                </v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <router-link
                to="/"
                class="text-decoration-none"
              >
                <v-list-item-title
                  style="color: #cacfd3"
                  class="font-weight-black"
                >
                  アスペクト
                </v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-row>
    </v-navigation-drawer>
    <!-- /side bar -->

    <!-- side bar for mobile -->
    <v-navigation-drawer
      v-else
      v-model="drawerMobile"
      absolute
      temporary
    >
      <v-list
        class="grow"
        dense
      >
        <v-list-item>
          <v-list-item-content>
            <router-link
              to="/"
              class="text-decoration-none"
            >
              <v-list-item-title
                style="color: #cacfd3"
                class="font-weight-black"
              >
                {{ $t("indexPage") }}
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <template v-for="(key, index) in Object.keys($t('categories'))">
          <v-list-group
            v-if="Object.keys($t('categories')[key]).length > 0"
            :key="`third-${index}`"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title
                  style="color: #cacfd3"
                  class="font-weight-black"
                >
                  {{ key }}
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(item, idx) in $t('categories')[key]"
              :key="idx"
              links
            >
              <v-list-item-content class="pl-5">
                <router-link
                  :to="
                    '/category' +
                      '/' +
                      Object.keys(categoryLists[index])[0] +
                      '/' +
                      categoryLists[index][Object.keys(categoryLists[index])[0]][
                        idx
                      ]
                  "
                  class="text-decoration-none"
                >
                  <v-list-item-title
                    style="color: #cacfd3; width: 160px"
                    class="font-weight-black text-truncate"
                  >
                    {{ item }}
                  </v-list-item-title>
                </router-link>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item
            :key="`forth-${index}`"
            link
          >
            <v-list-item-content>
              <router-link
                :to="'/category' + '/' + Object.keys(categoryLists[index])[0]"
                class="text-decoration-none"
              >
                <v-list-item-title
                  style="color: #cacfd3; width: 160px"
                  class="font-weight-black text-truncate"
                >
                  {{ key }}
                </v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider />

        <v-list-item>
          <v-list-item-content>
            <router-link
              to="/"
              class="text-decoration-none"
            >
              <v-list-item-title
                style="color: #cacfd3"
                class="font-weight-black"
              >
                教員一覧
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <router-link
              to="/"
              class="text-decoration-none"
            >
              <v-list-item-title
                style="color: #cacfd3"
                class="font-weight-black"
              >
                アスペクト
              </v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- /side bar for mobile -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

  name: 'NavBar',

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
