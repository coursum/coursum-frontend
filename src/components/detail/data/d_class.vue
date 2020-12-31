<template>
  <div>
    <div v-if="related">
      {{ related }}
    </div>
    <div v-if="classroom">
      {{ classroom }}
    </div>
    <div v-if="types">
      {{ types }}
    </div>
    <div v-if="tag">
      {{ tag }}
    </div>
    <div v-if="curriculumCode">
      {{ curriculumCode }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DClass',
  props: {
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

});
</script>
