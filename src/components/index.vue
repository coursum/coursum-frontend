<template>
  <div>Index</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import useRouter from '@/util/use-router';

export default defineComponent({
  name: 'Index',
  setup: (_, context) => {
    const { routerPush } = useRouter(context.root.$router);

    routerPush('/search?all');
  },
});
</script>
