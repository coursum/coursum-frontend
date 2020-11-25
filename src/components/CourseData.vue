<template>
  <v-card
    elevation="2"
    height="190"
    width="500"
    class="my-2 black--text d-flex flex-column justify-space-between px-5 pt-5"
  >
    <div>
      <v-row class="pa-0 ma-0">
        <div class="col-9 pa-0 ma-0">
          <div
            v-if="
              courseDatas[idx].category && courseDatas[idx].category[`${curLang}`]
            "
            style="color: #929292"
            class="text-truncate text-caption"
          >
            {{ courseDatas[idx].category[`${curLang}`] }}
          </div>

          <div
            v-if="courseDatas[idx].title"
            class="text-truncate"
          >
            <span
              v-if="
                courseDatas[idx].title.name &&
                  courseDatas[idx].title.name[`${curLang}`]
              "
              class="font-weight-black text-subtitle-1"
            >
              {{ courseDatas[idx].title.name[`${curLang}`] }}
            </span>
            <span
              v-if="
                courseDatas[idx].title.postscript &&
                  courseDatas[idx].title.postscript[`${curLang}`]
              "
              style="color: #929292"
              class="text-caption"
            >
              {{ courseDatas[idx].title.postscript[`${curLang}`] }}
            </span>
          </div>
        </div>

        <v-spacer />

        <div
          v-if="courseDatas[idx].schedule"
          class="col-3 pa-0 ma-0"
        >
          <div
            v-if="
              courseDatas[idx].schedule.semester &&
                courseDatas[idx].schedule.semester[`${curLang}`]
            "
            class="text-right text-truncate text-caption"
            style="color: #929292"
          >
            {{ courseDatas[idx].schedule.semester[`${curLang}`][0] }}・{{
              courseDatas[idx].credit
            }}
          </div>

          <div
            v-if="
              courseDatas[idx].schedule.times &&
                courseDatas[idx].schedule.times[`${curLang}`]
            "
            style="color: #929292"
            class="text-right text-truncate text-caption"
          >
            <span
              v-for="(time, i) in courseDatas[idx].schedule.times[
                `${curLang}`
              ]"
              :key="i"
            >
              {{ time[0] }}{{ time[3] }}
            </span>
          </div>
        </div>
      </v-row>

      <div class="summary text-body-1">
        <p
          v-if="courseDatas[idx].summary && courseDatas[idx].summary[`${curLang}`]"
          class="mb-0"
        >
          {{ courseDatas[idx].summary[`${curLang}`] }}
        </p>
      </div>
    </div>

    <div style="border-top: solid 1px #ebebeb">
      <v-row class="pa-0 ma-0">
        <v-chip
          v-if="
            courseDatas[idx].lecturers[0] &&
              courseDatas[idx].lecturers[0].name &&
              courseDatas[idx].lecturers[0].name[`${curLang}`]
          "
          class="my-2"
          small
          outlined
        >
          {{ courseDatas[idx].lecturers[0].name[`${curLang}`] }}
        </v-chip>

        <v-spacer />

        <router-link
          v-if="courseDatas[idx].title.name.en"
          :to="'/course-detail/' + courseDatas[idx].title.name.en"
          class="text-decoration-none"
        >
          <v-btn icon>
            <v-icon small>
              mdi-file-document-outline
            </v-icon>
          </v-btn>
        </router-link>

        <v-btn
          v-if="idsInTimetable.includes(courseDatas[idx].title.name.en)"
          icon
          @click="
            $store.commit('removeFromTimetable', courseDatas[idx].title.name.en)
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
          @click="
            $store.commit('addToTimetable', courseDatas[idx].title.name.en)
          "
        >
          <v-icon
            small
            color="#929292"
          >
            mdi-star-outline
          </v-icon>
        </v-btn>
      </v-row>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

interface Basic {
  en: string | null;
  jp: string | null;
  kana: string |null;
}

interface Lecturer {
  imgUrl: string | null;
  name: Basic;
  id: string | null;
  email: string | null;
  inCharge: boolean | null;
}

interface Title {
  postscript: Basic;
  name: Basic;
}

interface Schedule {
  year: number | null;
  span: Basic;
  semester: Basic;
  times: Basic;
}

interface Registration {
  number: null;
  suggestion: Basic;
  requirement: Basic;
  prerequisite: null;
}

interface CourseInfo {
  category: Basic;
  language: Basic;
  lecturers: Lecturer[];
  title: Title;
  schedule: Schedule;
  related: null;
  registration: Registration;
  classroom: string | null;
  summary: Basic;
  types: null;
  yearClassId: null;
  tag: {giga: boolean };
  curriculumCode: string | null;
  credit: number | null;
}

export default Vue.extend({

  name: 'CourseData',
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
  }),
  computed: {
    courseDatas(): CourseInfo[] {
      return this.$store.state.courseDatas;
    },
    idsInTimetable(): string[] {
      return this.$store.state.idsInTimetable;
    },
    curLang(): string {
      console.log();
      return this.$i18n.locale;
    },
  },
});
</script>

<style scoped>
.summary p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
