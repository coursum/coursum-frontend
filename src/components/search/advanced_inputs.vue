<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          class="mx-2"
        >
          mdi-tune
        </v-icon>
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
          v-model="teacher"
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
import {
  computed, defineComponent, onMounted, reactive, toRefs,
} from '@vue/composition-api';

import tool from '@/api/build_query';
import request from '@/api/request';

interface AdvancedInputs {
  giga: string;
  teacher: string;
  language: string;
  semester: string;
  day: string;
  time: string;
}

export default defineComponent({
  name: 'AdvancedInputs',
  setup: (_, context) => {
    const state = reactive({
      dialog: false,
      giga: '',
      teacher: '',
      language: '',
      semester: '',
      day: '',
      time: '',
      setWidth: { width: '100px', margin: '15px' },
      setFlex: 'd-flex align-center',
    });

    const getAdvancedInputs = computed((): AdvancedInputs => context.root.$store
      .state.advancedInputs);

    const languages = computed(() => [context.root.$i18n.t('english'), context.root.$i18n.t('japanese')]);

    const semesters = computed(() => [context.root.$i18n.t('spring'), context.root.$i18n.t('autumn')]);

    const timesStr = computed((): string => `${typeof state.day === 'string' ? state.day : ''}${typeof state.time === 'string' ? state.time : ''}`);

    const days = computed(() => [
      context.root.$i18n.t('sunday'),
      context.root.$i18n.t('monday'),
      context.root.$i18n.t('tuesday'),
      context.root.$i18n.t('wednesday'),
      context.root.$i18n.t('thursday'),
      context.root.$i18n.t('friday'),
      context.root.$i18n.t('saturday')]);

    const times = computed(() => [
      `1${context.root.$i18n.t('period')}`,
      `2${context.root.$i18n.t('period')}`,
      `3${context.root.$i18n.t('period')}`,
      `4${context.root.$i18n.t('period')}`,
      `5${context.root.$i18n.t('period')}`,
      `6${context.root.$i18n.t('period')}`,
      `7${context.root.$i18n.t('period')}`]);

    const setValues = () => {
      state.giga = getAdvancedInputs.value.giga;
      state.teacher = getAdvancedInputs.value.teacher;
      state.language = getAdvancedInputs.value.language;
      state.semester = getAdvancedInputs.value.semester;
      state.day = getAdvancedInputs.value.day;
      state.time = getAdvancedInputs.value.time;
    };

    onMounted(() => {
      setValues();
    });

    const storeValues = () => {
      const advancedInputs = {
        giga: state.giga,
        teacher: state.teacher,
        language: state.language,
        semester: state.semester,
        times: timesStr.value,
      };

      context.root.$store.commit('setAdvancedInputs', advancedInputs);
    };

    const resetValues = () => {
      state.giga = '';
      state.teacher = '';
      state.language = '';
      state.semester = '';
      state.day = '';
      state.time = '';
    };

    const goResult = async () => {
      const searchQuery = tool.buildQuery({
        builder: {
          giga: state.giga,
          teacher: state.teacher,
          language: state.language,
          semester: state.semester,
          times: timesStr.value,
        },
      });

      await request.fetchAndStoreCourses(searchQuery);

      storeValues();
      state.dialog = false;
      tool.goToResultPage(`/course/${searchQuery}`);
    };

    return {
      languages,
      semesters,
      times,
      days,
      resetValues,
      goResult,
      ...toRefs(state),
    };
  },
});
</script>
