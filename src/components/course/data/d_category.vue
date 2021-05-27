<template>
  <div
    class="text-truncate"
  >
    {{ categoryData ? categoryData : $t("others") }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { basicTemplate } from '@/assets/CourseInfo';

export default defineComponent({
  name: 'DCategory',
  props: {
    category: { type: Object, default: basicTemplate },
  },
  setup: (props, context) => {
    const curLang = computed((): string => context.root.$i18n.locale);

    const categoryData = computed((): string | null | undefined => props.category?.[curLang.value]);

    return {
      categoryData,
    };
  },
});
</script>

<style scoped>
div{
  font-size: 0.7rem;
  color: gray;
}
</style>

<i18n>
{
  "en": {
    "others": "others"
  },
  "jp": {
    "others": "その他"
  }
}
</i18n>
