<template>
  <v-card flat>
    <table>
      <template v-if="registration">
        <tr>
          <th>{{ $t('registrationNumber') }}</th>
          <td>
            <span v-if="registration.number">{{ registration.number }}</span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('prerequisite') }}</th>
          <td>
            <span v-if="prerequisite">
              {{ (prerequisite.mandatory || '') + (prerequisite.recommended || '') }}
            </span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('requirement') }}</th>
          <td>
            <span v-if="requirement">{{ requirement }}</span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('suggestion') }}</th>
          <td>
            <span v-if="suggestion">{{ suggestion }}</span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('related') }}</th>
          <td>
            <span v-if="related">{{ related }}</span>
          </td>
        </tr>
      </template>
      <tr>
        <th>{{ $t('classroom') }}</th>
        <td>
          <span v-if="classroom">
            {{ classroom }}
          </span>
        </td>
      </tr>
      <tr>
        <th>{{ $t('types') }}</th>
        <td>
          <span v-if="types">
            {{ types }}
          </span>
        </td>
      </tr>
      <tr>
        <th>GIGA</th>
        <td>
          <span v-if="tag">
            {{ tag.giga }}
          </span>
        </td>
      </tr>
      <tr>
        <th>{{ $t('curriculumCode') }}</th>
        <td>
          <span v-if="tag.curriculumCode">
            {{ tag.curriculumCode }}
          </span>
        </td>
      </tr>
    </table>
  </v-card>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';
import type { Course } from 'coursum-types';

export default defineComponent({
  name: 'CourseDetail',
  props: {
    courseData: {
      type: Object as PropType<Course>,
      required: true,
    },
  },
  setup: ({ courseData }, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'ja');

    const {
      classroom, types, registration, related, tag,
    } = courseData;
    const { prerequisite } = registration;
    const requirement = registration.requirement[curLang.value];
    const suggestion = registration.suggestion[curLang.value];

    return {
      registration,
      prerequisite,
      requirement,
      suggestion,
      related,
      classroom,
      types,
      tag,
    };
  },
});
</script>

<style scope>
table {
  width: 100%;
  border-collapse: collapse;
  empty-cells: show;
}

table tr:nth-child(2n) {
  background-color: var(--v-lightgrey-base);
}

table tr:nth-child(2n + 1) {
  background-color: var(--v-darkgrey-base);
}

table th {
  position: relative;
  text-align: left;
  width: 30%;
  color: var(--v-word-base);
  text-align: center;
  padding: 10px 0;
}

table td {
  text-align: left;
  width: 70%;
  text-align: center;
  padding: 10px 0;
}
</style>

<i18n>
{
  "en": {
    "registrationNumber": "Number",
    "prerequisite": "Prerequisite",
    "requirement": "Requirement",
    "suggestion": "Suggestion",
    "related": "Related",
    "classroom": "Classroom",
    "types": "Types",
    "curriculumCode": "Curriculum Code"
  },
  "ja": {
    "registrationNumber":"登録番号",
    "prerequisite":"前提科目（推奨）",
    "requirement":"前提科目（必須）",
    "suggestion":"履修条件",
    "related":"関連科目",
    "classroom":"開講場所",
    "types":"授業形態",
    "curriculumCode":"カリキュラムコード"
  }
}
</i18n>
