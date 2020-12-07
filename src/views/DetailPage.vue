<template>
  <div
    style="width: 90%"
    class="mx-auto my-12"
  >
    <div v-if="!isLoading">
      <v-card
        flat
        class="my-2 black--text d-flex flex-column justify-space-between px-5 pt-5"
      >
        <div>
          <div class="col-9 pa-0 ma-0">
            <div v-if="courseData.title">
              <span
                v-if="
                  courseData.title.name && courseData.title.name[`${curLang()}`]
                "
                class="font-weight-black text-subtitle-1"
              >
                {{ courseData.title.name[`${curLang()}`] }}
              </span>
            </div>
          </div>

          <div class="summary text-body-1">
            <p v-if="courseData.summary && courseData.summary[`${curLang()}`]">
              {{ courseData.summary[`${curLang()}`] }}
            </p>
          </div>
        </div>

        <!-- category -->
        <div v-if="courseData.category && courseData.category[`${curLang()}`]">
          {{ courseData.category[`${curLang()}`] }}
        </div>
        <!-- /category -->

        <!-- postscript -->
        <span
          v-if="
            courseData.title.postscript &&
              courseData.title.postscript[`${curLang()}`]
          "
        >
          {{ courseData.title.postscript[`${curLang()}`] }}
        </span>
        <!-- /postscript -->

        <!-- schedule -->
        <div
          v-if="courseData.schedule"
          class="col-3 pa-0 ma-0"
        >
          <div
            v-if="
              courseData.schedule.semester &&
                courseData.schedule.semester[`${curLang()}`]
            "
          >
            {{ courseData.schedule.semester[`${curLang()}`] }}
          </div>

          <div v-if="courseData.credit">
            {{ courseData.credit }}
            {{ $t("credit") }}
          </div>

          <div
            v-if="
              courseData.schedule.times &&
                courseData.schedule.times[`${curLang()}`]
            "
          >
            <span
              v-for="(time, idx) in courseData.schedule.times[`${curLang()}`]"
              :key="idx"
            >
              {{ time }}
            </span>
          </div>
        </div>
        <!-- /schedule -->

        <!-- lecturers -->
        <div>
          <v-chip
            v-for="(lecturer, index) in courseData.lecturers"
            :key="index"
            class="my-2"
            outlined
          >
            {{ lecturer.name[`${curLang()}`] }}
          </v-chip>
        </div>
        <!-- /lecturers -->

        <!-- favorite button -->
        <v-btn
          v-if="idsInTimetable().includes(courseData.title.name.en)"
          icon
          @click="
            $store.commit('removeFromTimetable', courseData.title.name.en)
          "
        >
          <v-icon
            small
            color="orange"
          >
            mdi-star
          </v-icon>
        </v-btn>
        <v-btn
          v-else
          icon
          @click="$store.commit('addToTimetable', courseData.title.name.en)"
        >
          <v-icon
            small
            color="#929292"
          >
            mdi-star-outline
          </v-icon>
        </v-btn>

        <!-- /favorite button -->
      </v-card>

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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

  name: 'DetailPage',

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
