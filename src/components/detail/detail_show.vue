<template>
  <v-card flat>
    <table>
      <template v-if="registration">
        <tr>
          <th>{{ $t('number') }}</th>
          <td>
            <span v-if="number">
              {{ number }}
            </span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('suggestion') }}</th>
          <td>
            <span v-if="suggestion">
              {{ suggestion }}
            </span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('requirement') }}</th>
          <td>
            <span v-if="requirement">
              {{ requirement }}
            </span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('requirement') }}</th>
          <td>
            <span v-if="prerequisite">
              {{ prerequisite }}
            </span>
          </td>
        </tr>
        <tr>
          <th>{{ $t('related') }}</th>
          <td>
            <span v-if="related">
              {{ related }}
            </span>
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
          <span v-if="curriculumCode">
            {{ curriculumCode }}
          </span>
        </td>
      </tr>
    </table>
  </v-card>
</template>

<script lang="ts">
import type { PropType } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';

import type { Registration, Tag } from '@/assets/CourseInfo';

export default defineComponent({
  name: 'DetailShow',
  props: {
    registration: {
      type: Object as PropType<Registration>,
      default: undefined,
    },
    related: {
      type: String,
      default: undefined,
    },
    classroom: {
      type: String,
      default: undefined,
    },
    types: {
      type: String,
      default: undefined,
    },
    tag: {
      type: Object as PropType<Tag>,
      default: undefined,
    },
    curriculumCode: {
      type: String,
      default: undefined,
    },
  },
  setup: (props, context) => {
    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'jp');

    const number = computed((): null | undefined => props.registration?.number);

    const suggestion = computed(() => props.registration?.suggestion?.[curLang.value]);

    const requirement = computed(() => props.registration?.requirement?.[curLang.value]);

    const prerequisite = computed((): null | undefined => props
      .registration?.prerequisite?.[curLang.value]);

    return {
      number,
      suggestion,
      requirement,
      prerequisite,
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
    "number": "Number",
    "suggestion": "Suggestion",
    "requirement": "Requirement",
    "prerequisite": "Prerequisite",
    "related": "Related",
    "classroom": "Classroom",
    "types": "Types",
    "giga": "GIGA",
    "curriculumCode": "Curriculum Code"
  },
  "jp": {
    "number":"登録番号",
    "suggestion":"履修条件",
    "requirement":"前提科目（必須）",
    "prerequisite":"前提科目（推奨）",
    "related":"関連科目",
    "classroom":"開講場所",
    "types":"授業形態",
    "giga":"GIGA",
    "curriculumCode":"カリキュラムコード"
  }
}
</i18n>
