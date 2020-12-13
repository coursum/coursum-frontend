<template>
  <div
    style="width: 90%"
    class="mx-auto my-12"
  >
    <div v-if="!isLoading">
      <course-data />

      <div>
        <v-switch
          v-model="isAllPanels"
          @change="showAllPanels()"
        />
      </div>

      <v-expansion-panels
        v-model="panel"
        multiple
        accordion
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ $t("registration") }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card
              flat
              class="mx-auto"
              style="width: 800px; padding: 20px"
            >
              <d-registration />
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ $t("content") }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card
              flat
              class="mx-auto"
              style="width: 800px; padding: 20px"
            >
              <d-class />
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ $t("planning") }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card
              flat
              class="mx-auto"
              style="width: 800px; padding: 20px"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CourseData from '@/components/CourseData.vue';
import DRegistration from '@/components/CourseData/DRegistration.vue';
import DClass from '@/components/CourseData/DClass.vue';

export default Vue.extend({

  name: 'CourseDetailPage',

  components: {
    CourseData,
    DRegistration,
    DClass,
  },

  data() {
    return {
      panel: [0],
      isAllPanels: false,
    };
  },

  computed: {
    labels() {
      return [this.$t('registration'), this.$t('content'), this.$t('planning')];
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },

  async created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.$store.commit('fetchData', this.$route.params.id);
    },
    showAllPanels() {
      if (this.isAllPanels) {
        this.panel = this.labels.map((k, i) => i);
      } else {
        this.panel = [];
      }
    },
  },

});
</script>

<i18n>
{
  "en": {
    "registration": "registration",
    "content": "content",
    "planning": "planning"
  },
  "jp": {
    "registration": "履修",
    "content": "授業",
    "planning": "計画"
  }
}
</i18n>
