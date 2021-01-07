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
  empty-cells: show;
}

table tr:nth-child(2n){
  background-color: var(--v-lightgrey-base);
}

table tr:nth-child(2n+1){
  background-color: var(--v-darkgrey-base);
}

table th{
  position: relative;
  text-align: left;
  width: 30%;
  color: var(--v-wordcolor-base);
  text-align: center;
  padding: 10px 0;
}

table td{
  text-align: left;
  width: 70%;
  text-align: center;
  padding: 10px 0;
}
</style>
