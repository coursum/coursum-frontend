<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ attrs, on }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon class="mx-2">
          mdi-tune
        </v-icon>
      </v-btn>
    </template>

    <v-card class="px-12 py-6">
      <div class="d-flex align-center">
        <div class="input-label">
          {{ $t("giga") }}
        </div>
        <v-checkbox v-model="giga" class="pa-0 ma-0" hide-details />
      </div>

      <div class="d-flex align-center">
        <div class="input-label">
          {{ $t("lecturer") }}
        </div>
        <v-text-field v-model="teacher" dense hide-details solo />
      </div>

      <div class="d-flex align-center">
        <div class="input-label">
          {{ $t("language") }}
        </div>
        <v-select v-model="language" :items="languages" dense hide-details solo />
      </div>

      <div class="d-flex align-center">
        <div class="input-label">
          {{ $t("semester") }}
        </div>
        <v-select v-model="semester" :items="semesters" dense hide-details solo />
      </div>

      <div class="d-flex align-center">
        <div class="input-label">
          {{ $t("day") }}
        </div>
        <v-select v-model="day" :items="days" dense hide-details solo />
      </div>

      <div class="d-flex align-center">
        <div class="input-label">
          {{ $t("time") }}
        </div>
        <v-select v-model="time" :items="times" dense hide-details solo />
      </div>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="resetValues">
          reset
        </v-btn>
        <v-btn @click="goResult">
          submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, reactive, ref, toRefs,
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
    const translateArray = (keys: string[]) => keys.map((key) => context.root.$i18n.t(key));

    const dialog = ref(false);

    const state = reactive({
      giga: '',
      teacher: '',
      language: '',
      semester: '',
      day: '',
      time: '',
    });

    const getAdvancedInputs = computed((): AdvancedInputs => (
      context.root.$store.state.advancedInputs
    ));

    const languages = computed(() => translateArray(['english', 'japanese']));

    const semesters = computed(() => translateArray(['spring', 'autumn']));

    const timesStr = computed(() => {
      const day = typeof state.day === 'string' ? state.day : '';
      const time = typeof state.time === 'string' ? state.time : '';

      return `${day}${time}`;
    });

    const days = computed(() => translateArray(
      ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    ));

    const times = computed(() => (
      Array(7).fill(0)
        .map((_, num) => num + 1)
        .map((period) => `${period} ${context.root.$i18n.t('period')}`)
    ));

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
      dialog.value = false;
      tool.goToResultPage(`/course/${searchQuery}`);
    };

    return {
      dialog,

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

<style scoped>
.input-label {
  width: 100px;
  margin: 15px;
}
</style>
