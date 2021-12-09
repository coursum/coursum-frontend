<template>
  <v-hover v-if="courseData">
    <template #default="{ hover }">
      <v-card class="my-2 px-5 pb-2 pt-4 d-flex flex-column justify-space-between"
              :class="cardClass(hover)" :style="cardStyle"
              @click.prevent="goResult"
      >
        <v-card-title class="font-weight-bold text-caption">
          {{ titleName }}
        </v-card-title>
        <v-card-subtitle class="font-weight-bold text-caption">
          {{ category || $t("others") }}
        </v-card-subtitle>
        <!-- By default, v-card-text has padding buttom.
        This will make textTruncate not working, so add a class "pb-0" here -->
        <v-card-text v-if="showSummary && summary"
                     class="pb-0"
                     :class="{ 'truncate-course-summary': textTruncate }"
        >
          {{ summary }}
        </v-card-text>

        <v-divider class="my-2" />

        <div class="d-flex justify-space-between">
          <div>
            <v-chip v-if="semester" outlined x-small class="mr-2">
              {{ semester }}
            </v-chip>
            <template v-if="times">
              <v-chip v-for="(time, i) in times" :key="i" outlined x-small class="mr-2">
                {{ time }}
              </v-chip>
            </template>
          </div>
          <div>
            <v-chip v-if="credit" outlined x-small>
              {{ credit }}{{ $t("credit") }}
            </v-chip>
          </div>
        </div>

        <div class="d-flex justify-space-between">
          <!-- TODO: solve overflow of lecturers -->
          <div>
            <v-chip v-for="(lecturer) in lecturers" :key="lecturer.name"
                    outlined x-small
                    class="mr-2" :class="{'text-truncate': textTruncate}"
            >
              {{ lecturer.name }}
            </v-chip>
          </div>
          <button-bookmark :course="course" />
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script lang="ts">
import type { PropType, SetupContext } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';
import type { CourseV2 } from 'coursum-types';

import ButtonBookmark from '@/components/button-bookmark.vue';
import useRouter from '@/util/use-router';

interface Props {
  courseData: PropType<CourseV2>;
  showSummary: boolean;
  textTruncate: boolean;
  hasWidth: boolean;
}

const useCard = ({ textTruncate, hasWidth }: Partial<Props>, context: SetupContext) => {
  const cardWidth = computed(() => {
    const { name } = context.root.$vuetify.breakpoint;
    const widths = {
      xs: 100, sm: 80, md: 48, lg: 32, xl: 30,
    };

    if (name in widths) return widths[name];

    return 30;
  });

  const cardClass = computed(() => (hover: boolean) => {
    const classes: string[] = [];
    const height = textTruncate && hover ? 4 : 1;

    if (textTruncate) classes.push('transition-swing');
    classes.push(`elevation-${height}`);

    return classes.join(' ');
  });

  const cardStyle = computed(() => (hasWidth ? { width: `${cardWidth.value}%` } : {}));

  return {
    cardClass,
    cardStyle,
  };
};

export default defineComponent({
  name: 'CourseCard',
  components: {
    ButtonBookmark,
  },
  props: {
    courseData: {
      type: Object as PropType<CourseV2>,
      required: true,
    },
    showSummary: {
      type: Boolean,
      default: true,
    },
    textTruncate: {
      type: Boolean,
      default: true,
    },
    hasWidth: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, context) => {
    const { routerPush } = useRouter(context.root.$router);

    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'ja');

    const course = props.courseData;

    const { credit, id } = course;

    const lecturers = computed(() => (
      course.lecturers
        .map((lecturer) => {
          const { name, ...rest } = lecturer;

          return { ...rest, name: name[curLang.value] };
        })
        .filter((lecturer) => lecturer.name)
    ));
    const titleName = computed(() => course.title[curLang.value]);
    const category = computed(() => course.tag.category[curLang.value]);
    const semester = computed(() => course.schedule.semester[curLang.value]);
    const times = computed(() => course.schedule.times[curLang.value].map((time) => time || 'TBD'));
    const summary = computed(() => {
      const titleJp = course.title.ja || '';
      const summaryLang = ['研究会Ａ', '研究会Ｂ'].includes(titleJp) ? 'en' : curLang.value;

      return course.summary[summaryLang];
    });

    const { textTruncate, hasWidth } = props;
    const { cardClass, cardStyle } = useCard({ textTruncate, hasWidth }, context);

    const goResult = async () => {
      const searchQuery = new URLSearchParams({ id });

      await routerPush(`/course/search?${searchQuery.toString()}`);
    };

    return {
      cardClass,
      cardStyle,
      goResult,
      titleName,
      category,
      summary,
      credit,
      semester,
      times,
      lecturers,
      course,
    };
  },
});
</script>

<style scoped>
div.truncate-course-summary {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;

  text-overflow: ellipsis;

  -webkit-line-clamp: 5;
}
</style>

<i18n>
{
  "en": {
    "others": "others",
    "credit": "credit"
  },
  "ja": {
    "others": "その他",
    "credit": "単位"
  }
}
</i18n>
