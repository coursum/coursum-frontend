<template>
  <v-card flat>
    <table>
      <template v-if="registration">
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
        <th>{{ $t('location') }}</th>
        <td>
          <span v-if="location">
            {{ location }}
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
import type { CourseV2 } from 'coursum-types';

export default defineComponent({
  name: 'CourseDetail',
  props: {
    courseData: {
      type: Object as PropType<CourseV2>,
      required: true,
    },
  },
  setup: ({ courseData }, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'ja');

    const {
      location, registration, related, tag,
    } = courseData;
    const { prerequisite } = registration;
    const requirement = registration.requirement[curLang.value];
    const suggestion = registration.suggestion[curLang.value];
    const types = courseData.tag.types[curLang.value];

    return {
      registration,
      prerequisite,
      requirement,
      suggestion,
      related,
      location,
      types,
      tag,
    };
  },
});
</script>

<style scope>
table {
  width: 100%;

  empty-cells: show;

  border-collapse: collapse;
}

table tr:nth-child(2n) {
  background-color: var(--v-stripedTableOddRow-base);
}

table tr:nth-child(2n + 1) {
  background-color: var(--v-stripedTableEvenRow-base);
}

table th {
  position: relative;

  width: 30%;
  padding: 10px 0;

  text-align: left;
  text-align: center;
}

table td {
  width: 70%;
  padding: 10px 0;

  text-align: left;
  text-align: center;
}
</style>

<i18n>
{
  "en": {
    "prerequisite": "Prerequisite",
    "requirement": "Requirement",
    "suggestion": "Suggestion",
    "related": "Related",
    "location": "Location",
    "types": "Types",
    "curriculumCode": "Curriculum Code"
  },
  "ja": {
    "prerequisite":"前提科目（推奨）",
    "requirement":"前提科目（必須）",
    "suggestion":"履修条件",
    "related":"関連科目",
    "location":"開講場所",
    "types":"授業形態",
    "curriculumCode":"カリキュラムコード"
  }
}
</i18n>
