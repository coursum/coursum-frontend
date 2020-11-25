<template>
  <div v-if="!isLoading">
    <div class="d-flex align-center flex-column py-12">
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

                    <!-- <span v-if="isSharedPage">
                      <v-btn
                        v-if="
                          idsInTimetable().includes(
                            coursesInTimeTable[courseId].title.name.en
                          )
                        "
                        icon
                        @click="
                          $store.commit(
                            'removeFromTimetable',
                            coursesInTimeTable[courseId].title.name.en
                          )
                        "
                      >
                        <v-icon
                          small
                          color="orange"
                        >mdi-star</v-icon>
                      </v-btn>
                      <v-btn
                        v-else
                        icon
                        @click="
                          $store.commit(
                            'addToTimetable',
                            coursesInTimeTable[courseId].title.name.en
                          )
                        "
                      >
                        <v-icon
                          small
                          color="#929292"
                        >mdi-star-outline</v-icon>
                      </v-btn>
                    </span>
                    <span v-else>
                      <v-btn
                        icon
                        @click="
                          $store.commit(
                            'removeFromTimetable',
                            coursesInTimeTable[courseId].title.name.en
                          ),
                          updateTable()
                        "
                      >
                        <v-icon
                          small
                          color="orange"
                        >mdi-star</v-icon>
                      </v-btn>
                    </span> -->
                  </span>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

  name: 'TimeTable',

  data: () => ({
  }),

  methods: {

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
