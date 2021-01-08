<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="blue"
        dark
        class="mt-6"
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
          {{ $t("giga") }}
        </div>
        <v-checkbox
          v-model="giga"
          class="pa-0 ma-0"
          hide-details
        />
      </div>
      <div :class="setFlex">
        <div :style="setWidth">
          {{ $t("lecturer") }}
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
          {{ $t("language") }}
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
          {{ $t("semester") }}
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
          {{ $t("day") }}
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
          {{ $t("time") }}
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
          @click="resetValues"
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
      setWidth: { width: '100px', margin: '15px' },
      setFlex: 'd-flex align-center',
    };
  },
  computed: {
    getAdvancedInputs(): AdvancedInputs {
      return this.$store.state.advancedInputs;
    },
    languages() {
      return [this.$i18n.t('english'), this.$i18n.t('japanese')];
    },
    semesters() {
      return [this.$i18n.t('spring'), this.$i18n.t('autumn')];
    },
    days() {
      return [
        this.$i18n.t('sunday'),
        this.$i18n.t('monday'),
        this.$i18n.t('tuesday'),
        this.$i18n.t('wednesday'),
        this.$i18n.t('thursday'),
        this.$i18n.t('friday'),
        this.$i18n.t('saturday')];
    },
    times() {
      return [
        `1${this.$i18n.t('period')}`,
        `2${this.$i18n.t('period')}`,
        `3${this.$i18n.t('period')}`,
        `4${this.$i18n.t('period')}`,
        `5${this.$i18n.t('period')}`,
        `6${this.$i18n.t('period')}`,
        `7${this.$i18n.t('period')}`];
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
    resetValues() {
      this.giga = '';
      this.lecturer = '';
      this.language = '';
      this.semester = '';
      this.day = '';
      this.time = '';
    },
    goResult() {
      let pushPath;
      let hasQuery;
      let query = '';

      const times = `${this.day}${this.time}`;

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

      if (this.$route.params.query) {
        const pattern = /^query=/;

        [query] = this.$route.params.query.split('&');

        hasQuery = pattern.test(query);
      } else {
        hasQuery = false;
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

      this.pushPath(pushPath);

      this.storeValues();
      this.dialog = false;
    },
    pushPath(pushPath: string) {
      if (this.$route.path !== pushPath) {
        this.$router.push(pushPath);
      }
    },
  },
});
</script>

<i18n>
{
  "en": {
    "giga": "GIGA",
    "lecturer": "Lecturer",
    "language": "Language",
    "semester": "Semester",
    "day": "Day",
    "time": "Time",
    "english": "English",
    "japanese": "Japanese",
    "spring": "Spring",
    "autumn": "Autumn",
    "sunday": "Sunday" ,
    "monday": "Monday",
    "tuesday":  "Tuesday",
    "wednesday": "Wednesday",
    "thursday": "Thursday",
    "friday": "Friday",
    "saturday":"Saturday",
    "period": "period"
  },
  "jp": {
    "giga": "GIGA",
    "lecturer": "教員",
    "language": "言語",
    "semester": "学期",
    "day": "曜日",
    "time": "時間",
    "english": "英語",
    "japanese": "日本語",
    "spring": "春学期",
    "autumn": "秋学期",
    "sunday": "日曜日" ,
    "monday": "月曜日",
    "tuesday":  "火曜日",
    "wednesday": "水曜日",
    "thursday": "木曜日",
    "friday": "金曜日",
    "saturday":"土曜日",
    "period": "時限目"
  }
}
</i18n>
