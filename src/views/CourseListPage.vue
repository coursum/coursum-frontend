<template>
  <div>
    <div
      class="d-flex flex-row-reverse pt-3 pr-3"
    >
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            class="text-decoration-none mx-1"
            v-on="on"
            @click.prevent="attrs['aria-expanded'] = !attrs['aria-expanded']"
          >
            <v-icon
              color="secondary"
            >
              mdi-cog-outline
            </v-icon>
          </v-btn>
        </template>

        <settings />
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            class="text-decoration-none mx-1"
            v-on="on"
            @click.prevent="attrs['aria-expanded'] = !attrs['aria-expanded']"
          >
            <v-icon
              color="secondary"
            >
              mdi-account-circle-outline
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item
              to="/timetable"
              link
            >
              <v-list-item-title>
                {{ $t('myTable') }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>
    <div
      :style="{ width : width + '%' }"
      class="mx-auto"
    >
      <div
        class="text-center primary--text"
        :style="{ 'font-size' : fontSize + 'rem' }"
      >
        Coursum
      </div>
      <search-bar />
    </div>

    <div class="mx-0 my-6">
      <div
        v-if="isLoading"
        class="d-flex flex-column px-3"
      >
        <v-skeleton-loader
          v-for="n in pgPageSize"
          :key="n"
          height="180"
          type="card"
          class="my-1"
        />
      </div>

      <div
        v-else
      >
        <div class="d-flex flex-wrap justify-space-around px-3">
          <course-data
            v-for="n in pgPageSize"
            :key="n-1"
            :course-data="courseDatas[(pgPageSize * pgPage + n-1) - pgPageSize]"
          />
        </div>
        <div
          style="max-width: 500px"
          class="mx-auto my-6"
        >
          <v-pagination
            v-model="pgPage"
            class="mb-12"
            :length="pgLength"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CourseData from '@/components/CourseData.vue';
import SearchBar from '@/components/SearchBar.vue';
import { CourseInfo } from '@/assets/CourseInfo';
import Settings from '@/components/Settings.vue';

export default Vue.extend({
  name: 'CourseListPage',
  components: {
    SearchBar,
    CourseData,
    Settings,
  },
  data() {
    return {
      pgPage: 1,
      pgPageSize: 12,
      word: '',
    };
  },
  computed: {
    width(): number {
      return this.$vuetify.breakpoint.lgAndUp ? 40 : 80;
    },
    fontSize(): number {
      return this.$vuetify.breakpoint.lgAndUp ? 3 : 2;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    pgLength() {
      const tmp = Math.ceil(this.courseDatas.length / this.pgPageSize);
      return tmp;
    },
    courseDatas(): CourseInfo[] {
      return this.$store.state.courseDatas;
    },
  },
  watch: {
    async $route() {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      const { path } = this.$route;
      const params = path.split('/').slice(1);
      let word;

      if (params[0] === 'category') {
        word = params.slice(1).join(' ');
        this.word = word;
      } else if (params[0] === 'search') {
        word = params.slice(1);
      } else {
        word = '';
      }
      this.$store.commit('fetchData', `query=${word}`);
    },
  },
});
</script>

<i18n>
{
  "en": {
    "myTable": "My Time Table"
  },
  "jp": {
    "myTable": "マイ時間割"
  }
}
</i18n>
