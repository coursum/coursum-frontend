<template>
  <div
    style="width: 90%"
    class="mx-auto my-12"
  >
    <div v-if="!isLoading">
      <course-data />
    </div>

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
            <div v-if="courseData.registration">
              <div v-if="courseData.registration.prerequisite">
                <div v-if="courseData.registration.prerequisite.mandatory">
                  <span
                    v-for="(manInfo, index) in courseData.registration
                      .prerequisite.mandatory"
                    :key="index"
                  >
                    {{ manInfo }}
                  </span>
                </div>
                <div v-if="courseData.registration.prerequisite.recommended">
                  <span
                    v-for="(recInfo, index) in courseData.registration
                      .prerequisite.recommended"
                    :key="index"
                  >
                    {{ recInfo }}
                  </span>
                </div>
              </div>
              <div
                v-if="
                  courseData.registration.requirement &&
                    courseData.registration.requirement[`${curLang()}`]
                "
              >
                {{ courseData.registration.requirement[`${curLang()}`] }}
              </div>
              <div v-if="courseData.title.name[`${curLang()}`]">
                {{ courseData.title.name[`${curLang()}`] }}
              </div>
            </div>
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
            <div v-if="courseData.classTypes">
              {{ courseData.classTypes }}
            </div>
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
</template>

<script lang="ts">
import Vue from 'vue';
import CourseData from '@/components/CourseData.vue';

export default Vue.extend({

  name: 'CourseDetailPage',

  components: {
    CourseData,
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
