<template>
  <v-card flat>
    <table>
      <template v-if="registration">
        <tr>
          <th>{{ $t('number') }}</th>
          <td v-if="number">
            {{ number }}
          </td>
        </tr>
        <tr>
          <th>{{ $t('suggestion') }}</th>
          <td v-if="suggestion">
            {{ suggestion }}
          </td>
        </tr>
        <tr>
          <th>{{ $t('requirement') }}</th>
          <td v-if="requirement">
            {{ requirement }}
          </td>
        </tr>
        <tr>
          <th>{{ $t('requirement') }}</th>
          <td v-if="prerequisite">
            {{ prerequisite }}
          </td>
        </tr>
        <tr>
          <th>{{ $t('related') }}</th>
          <td v-if="related">
            {{ related }}
          </td>
        </tr>
      </template>
      <tr>
        <th>{{ $t('classroom') }}</th>
        <td v-if="classroom">
          {{ classroom }}
        </td>
      </tr>
      <tr>
        <th>{{ $t('types') }}</th>
        <td v-if="types">
          {{ types }}
        </td>
      </tr>
      <tr>
        <th>GIGA</th>
        <td v-if="tag">
          {{ tag.giga }}
        </td>
      </tr>
      <tr>
        <th>{{ $t('curriculumCode') }}</th>
        <td v-if="curriculumCode">
          {{ curriculumCode }}
        </td>
      </tr>
    </table>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Basic } from '@/assets/CourseInfo';

export default Vue.extend({
  name: 'DetailIndex',
  props: {
    registration: {
      type: Object,
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
      type: Object,
      default: undefined,
    },
    curriculumCode: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    number(): null | undefined {
      return this.registration?.number;
    },
    suggestion(): Basic {
      return this.registration?.suggestion?.[`${this.curLang}`];
    },
    requirement(): Basic {
      return this.registration?.requirement?.[`${this.curLang}`];
    },
    prerequisite(): null | undefined {
      return this.registration?.prerequisite?.[`${this.curLang}`];
    },
    curLang(): string {
      return this.$i18n.locale;
    },
  },

});
</script>

<style>
table{
  width: 100%;
  border-collapse: collapse;
}

table tr{
  border-bottom: solid 2px rgb(255, 255, 255);
}

table th{
  position: relative;
  text-align: left;
  width: 30%;
  background-color: var(--v-blue-base);
  color: white;
  text-align: center;
  padding: 10px 0;
}

table td{
  text-align: left;
  width: 70%;
  text-align: center;
  background-color: rgb(218, 238, 252);
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
