<template>
  <div v-if="!isLoading">
    <time-table />
    <!-- <div class="d-flex align-center flex-column py-12">
      <div>TimeTable</div>
      <v-dialog
        v-model="dialog2"
        persistent
        max-width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <span>
            <v-btn
              style="min-width: 0"
              outlined
              v-bind="attrs"
              small
              v-on="on"
              @click="
                dialog2 = true;
                convertToURL();
              "
            >
              <v-icon small>mdi-share</v-icon>
            </v-btn>
          </span>
        </template>
        <v-card class="pa-6">
          <v-card-text>以下のリンクで、時間割を共有できます</v-card-text>
          <v-text-field
            id="input"
            v-model="convertedURL"
            :prepend-icon="'mdi-clipboard-text-multiple-outline'"
            readonly
            @click:prepend="doCopy"
          />

          <v-card-actions>
            <v-chip
              v-if="copiedURL"
              class="ma-2"
              color="teal"
              text-color="white"
            >
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              Copied!
            </v-chip>
            <v-spacer />
            <v-btn
              color="green darken-1"
              text
              @click="closeDialog"
            >
              完了
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div
      v-for="(dayArray, idx) in tableDatas"
      :key="idx"
      class="ma-2 py-2"
    >
      <div
        style="color: #929292"
        class="text-center"
      >
        {{ $t("days")[idx] }}
      </div>

      <v-divider />

      <div class="py-3">
        <div
          v-for="(courseIdList, index) in dayArray"
          :key="index"
        >
          <div
            v-if="courseIdList.some((e) => e !== -1)"
            class="d-flex justify-center my-1"
          >
            <v-btn
              v-if="courseIdList.length > 1"
              style="min-width: 0; color: #929292"
              text
            >
              {{ index + 1 }}
            </v-btn>

            <v-card
              v-if="courseIdList.length > 1"
              elevation="2"
              tile
              style="width: 100%"
              class="px-2"
            >
              <div
                v-for="(courseId, i) in courseIdList.slice(1)"
                :key="i"
                class="d-flex justify-space-between align-center"
              >
                <div
                  v-if="
                    courseData.title && courseData.title.name
                      && courseData.title.name[`${curLang()}`]
                  "
                >
                  <span

                    class="text-caption"
                  >{{
                    coursesInTimeTable[courseId].title.name[`${curLang()}`]
                  }}</span>

                  <span class="d-flex flex-row">
                    <router-link
                      :to="'/course-detail/' + courseData.title.name.en"
                      class="text-decoration-none"
                    >
                      <v-btn icon>
                        <v-icon small>
                          mdi-file-document-outline
                        </v-icon>
                      </v-btn>
                    </router-link>

                  </span>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TimeTable from '@/components/TimeTable.vue';

export default Vue.extend({

  name: 'TimeTablePage',
  components: {
    TimeTable,
  },

  data() {
    return {
      dialog: false,
      dialog2: false,
      passphrase: '',
      convertedURL: '',
      tableDatas: [...Array(6).fill(0).map(() => Array(7).fill(0).map(() => [-1])), [[-1]]],
      days: ['月', '火', '水', '木', '金', '土', 'その他'],
      copiedURL: false,
      isLoading: true,
      isSharedPage: false,
    };
  },
  computed: {
  },
  mounted() {
    if (this.$route.path.split('/')[2] === 'shared') {
      this.isSharedPage = true;
    } else {
      this.isSharedPage = false;
    }
  },
  methods: {
    idsInTimetable(): string[] {
      return this.$store.state.idsInTimetable;
    },
    updateTable() {
      // const tempTableDatas = [...Array(6).fill(0)
      //   .map(() => Array(7)
      //     .fill(0).map(() => [-1])), [[-1]]];
      // let idsList = [];
      // if (this.isSharedPage) {
      //   const arr = this.$route.path.split('/')[3];
      //   if (arr) {
      //     idsList = arr.split('_');
      //   }
      // } else {
      //   idsList = this.$store.state.idsInTimetable.slice(1);
      // }
      // this.coursesInTimeTable = idsList
      //   .map((id: string | null) => this.courseDatas
      //     .filter((data) => data.title.name.en === id));
      // this.coursesInTimeTable.forEach((courseInTimeTable: CourseInfo, index: number) => {
      //   if (courseInTimeTable.schedule === undefined
      //       || courseInTimeTable.schedule.times === undefined
      //     || courseInTimeTable.schedule.times.en === null) {
      //     tempTableDatas[6][0].push(index); // put in "others"
      //   } else {
      //     const classInfo = courseInTimeTable.schedule.times.en[0].split(' ');
      //     const classTime: number = parseInt(classInfo[1][0], 10);
      //     const classDay: number = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
      // 'Friday', 'Saturday']
      //       .findIndex((day) => day === classInfo[0]);
      //     tempTableDatas[classDay][classTime - 1].push(index);
      //   }
      // });
      // this.tableDatas = tempTableDatas;
    },

    convertToURL() {
      this.convertedURL = `http://localhost:8080/timetable/shared/${this.idsInTimetable().slice(1).join('_')}`;
      this.passphrase = '';
    },
    doCopy() {
      const copyText = document.querySelector('#input') as HTMLInputElement;
      if (copyText !== null) {
        copyText.select();
      }
      document.execCommand('copy');
      this.copiedURL = true;
    },
    closeDialog() {
      this.dialog2 = false;
      this.copiedURL = false;
    },
    curLang() {
      return this.$i18n.locale;
    },
  },
});
</script>

<i18n>
{
  "en": {
    "days":  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Others"]
  },
  "jp": {
    "days": ["月", "火", "水", "木", "金", "土", "その他"]
  }
}
</i18n>
