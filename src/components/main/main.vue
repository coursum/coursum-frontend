<template>
  <div>
    <div class="d-flex flex-row-reverse pt-3 pr-3">
      <setting-button />
      <account-button />

      <span class="mx-1">
        <keep-alive>
          <advanced-inputs />
        </keep-alive>
      </span>
    </div>

    <div class="mx-auto">
      <coursum-logo />

      <keep-alive>
        <search-input />
      </keep-alive>
    </div>

    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AccountButton from '@/components/course/account_button.vue';
import SettingButton from '@/components/setting/setting_button.vue';
import CoursumLogo from '@/components/course/coursum_logo.vue';
import SearchInput from '@/components/search/search_input.vue';
import AdvancedInputs from '@/components/search/advanced_inputs.vue';

export default Vue.extend({
  name: 'Main',
  components: {
    AccountButton,
    SettingButton,
    CoursumLogo,
    SearchInput,
    AdvancedInputs,
  },
});
</script>
