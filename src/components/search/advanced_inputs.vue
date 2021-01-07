<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Advanced Search
      </v-btn>
    </template>

    <v-card
      class="px-12 py-6"
    >
      <div :class="setFlex">
        <div :style="setWidth">
          GIGA
        </div>
        <v-checkbox
          v-model="giga"
          class="pa-0 ma-0"
          hide-details
        />
      </div>
      <div :class="setFlex">
        <div :style="setWidth">
          lecturer
        </div>
        <v-text-field
          v-model="lecturer"
          dense
          hide-details
          solo
        />
      </div>
      <div :class="setFlex">
        <div :style="setWidth">
          Language
        </div>
        <v-select
          v-model="language"
          :items="languages"
          dense
          hide-details
          solo
        />
      </div>
      <div :class="setFlex">
        <div :style="setWidth">
          Semester
        </div>
        <v-select
          v-model="semester"
          :items="semesters"
          dense
          hide-details
          solo
        />
      </div>
      <div :class="setFlex">
        <div :style="setWidth">
          Day
        </div>
        <v-select
          v-model="day"
          :items="days"
          dense
          hide-details
          solo
        />
      </div>
      <div :class="setFlex">
        <div :style="setWidth">
          Time
        </div>
        <v-select
          v-model="time"
          :items="times"
          dense
          hide-details
          solo
        />
      </div>

      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="cleanValues"
        >
          reset
        </v-btn>
        <v-btn
          @click="goResult"
        >
          submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Query:     c.Query("query"),
       Category:  c.Query("category"), select
       Classroom: c.Query("classroom"), select
       Language:  c.Query("language"), select
       Semester:  c.Query("semester"), select
       Teacher:   c.Query("teacher"), input
       Times:     c.Query("times"), select
       Giga:      c.Query("giga") == "true" checkbox -->
</template>

<script lang="ts">
import Vue from 'vue';

interface AdvancedInputs {
  giga: string;
  lecturer: string;
  language: string;
  semester: string;
  day: string;
  time: string;
}

export default Vue.extend({
  name: 'SearchInput',
  data() {
    return {
      dialog: false,
      giga: '',
      lecturer: '',
      language: '',
      semester: '',
      day: '',
      time: '',
      languages: ['英語', '日本語', '中国語', 'ドイツ語'],
      semesters: ['春学期', '秋学期'],
      days: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
      times: ['１時限', '２時限', '３時限', '４時限', '５時限', '６時限', '７時限'],
      setWidth: { width: '100px', margin: '15px' },
      setFlex: 'd-flex align-center',
    };
  },
  computed: {
    getAdvancedInputs(): AdvancedInputs {
      return this.$store.state.advancedInputs;
    },
  },
  created() {
    this.setValues();
  },
  methods: {
    setValues() {
      this.giga = this.getAdvancedInputs.giga;
      this.lecturer = this.getAdvancedInputs.lecturer;
      this.language = this.getAdvancedInputs.language;
      this.semester = this.getAdvancedInputs.semester;
      this.day = this.getAdvancedInputs.day;
      this.time = this.getAdvancedInputs.time;
    },
    storeValues() {
      const advancedInputs = {
        giga: this.giga,
        lecturer: this.lecturer,
        language: this.language,
        semester: this.semester,
        day: this.day,
        time: this.time,
      };

      this.$store.commit('setAdvancedInputs', advancedInputs);
    },
    cleanValues() {
      this.giga = '';
      this.lecturer = '';
      this.language = '';
      this.semester = '';
      this.day = '';
      this.time = '';
    },
    reset() {
      let pushPath;

      const isRootPath = this.$route.path === '/';
      let hasOption;
      let hasQuery;

      let query = '';

      if (!isRootPath) {
        const attrs = this.$route.params.query.split('&');

        [query] = attrs;

        const pattern = /^query=/;

        hasQuery = pattern.test(query);

        if (attrs.length === 1) {
          if (hasQuery) {
            hasOption = false;
          } else {
            hasOption = true;
          }
        } else {
          hasOption = true;
        }
      }

      if (hasQuery && hasOption) {
        pushPath = `/search/${query}`;
      } else if (hasOption) {
        pushPath = '/';
      } else if (hasQuery) {
        pushPath = `/search/${query}`;
      } else {
        pushPath = '/';
      }

      if (this.$route.path !== pushPath) {
        this.$router.push(pushPath);
      }

      this.cleanValues();
    },
    goResult() {
      let pushPath;
      let hasQuery;
      let query = '';

      const times = `${this.day}${this.time}`;
      const isRootPath = this.$route.path === '/';

      const options = [
        ['giga', this.giga],
        ['teacher', this.lecturer],
        ['language', this.language],
        ['semester', this.semester],
        ['times', times],
      ]
        .filter(([, value]) => (
          value
          && value !== ''
          && value !== null
          && value !== undefined
        ))
        .map(([key, value]) => `${key}=${value}`).join('&');

      const hasOption = options !== '';

      if (isRootPath) {
        hasQuery = false;
      } else {
        const pattern = /^query=/;

        [query] = this.$route.params.query.split('&');

        hasQuery = pattern.test(query);
      }

      if (hasQuery && hasOption) {
        pushPath = `/search/${query}&${options}`;
      } else if (hasOption) {
        pushPath = `/search/${options}`;
      } else if (hasQuery) {
        pushPath = `/search/${query}`;
      } else {
        pushPath = '/';
      }

      if (this.$route.path !== pushPath) {
        this.$router.push(pushPath);
      }

      this.storeValues();
      this.dialog = false;
    },
  },
});
</script>
