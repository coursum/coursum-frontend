<template>
  <v-hover v-if="courseData">
    <template #default="{ hover }">
      <v-card class="my-2 px-5 pb-2 pt-4 d-flex flex-column justify-space-between"
              :class="cardClass(hover)" :style="cardStyle"
              @click.prevent="goResult"
      >
        <div>
          <div class="text-truncate caption--text course-category">
            {{ category || $t("others") }}
          </div>
          <div v-if="titleName"
               class="text-truncate font-weight-bold word--text course-title"
          >
            {{ titleName }}
          </div>
          <span v-if="postscript"
                class="px-6 text-caption text-truncate course-postscript"
          >
            {{ postscript }}
          </span>
          <div v-if="showSummary && summary"
               class="caption--text course-summary" :class="{summary: textTruncate}"
          >
            <p class="my-0">
              {{ summary }}
            </p>
          </div>
        </div>

        <div>
          <div class="d-flex d-column justify-space-between">
            <div>
              <v-chip v-if="credit" color="caption" outlined x-small>
                {{ credit }}{{ $t("credit") }}
              </v-chip>
              <v-chip v-if="semester" color="caption" outlined x-small>
                {{ semester }}
              </v-chip>
            </div>
            <span v-if="times">
              <v-chip v-for="(time, i) in times" :key="i"
                      color="caption" outlined x-small
              >
                {{ time }}
              </v-chip>
            </span>
          </div>

          <v-divider class="my-1" />

          <div class="d-flex justify-space-between align-center">
            <button-bookmark :course="course" />
            <span v-for="(lecturer) in lecturers" :key="lecturer.name"
                  class="mr-2 course-lecturer" :class="{'text-truncate': textTruncate}"
            >
              {{ lecturer.name }}
            </span>
          </div>
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script lang="ts">
import type { PropType, SetupContext } from '@vue/composition-api';
import { computed, defineComponent } from '@vue/composition-api';
import type { Course } from 'coursum-types';

import ButtonBookmark from '@/components/button-bookmark.vue';
import useRouter from '@/util/use-router';

interface Props {
  courseData: PropType<Course>;
  showSummary: boolean;
  textTruncate: boolean;
  hasWidth: boolean;
  hasHeight: boolean;
}

const useCard = ({ textTruncate, hasWidth, hasHeight }: Partial<Props>, context: SetupContext) => {
  const cardWidth = computed(() => {
    const { name } = context.root.$vuetify.breakpoint;
    const widths = {
      xs: 100, sm: 80, md: 48, lg: 32, xl: 30,
    };

    if (name in widths) return widths[name];

    return 30;
  });

  const cardClass = computed(() => (hover: boolean) => {
    let height;
    const classes: string[] = [];

    if (textTruncate) {
      height = hover ? 4 : 1;
      classes.push('transition-swing');
    } else {
      height = 1;
    }
    classes.push(`elevation-${height}`);

    return classes.join(' ');
  });

  const cardStyle = computed(() => {
    const width = hasWidth ? { width: `${cardWidth.value}%` } : {};
    const height = (hasWidth && hasHeight) ? { height: '230px' } : {};

    return { ...width, ...height };
  });

  return {
    cardWidth,
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
      type: Object as PropType<Course>,
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
    hasHeight: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, context) => {
    const { routerPush } = useRouter(context.root.$router);

    const curLang = computed(() => context.root.$i18n.locale as 'en' | 'ja');

    const course = props.courseData;

    const { credit, yearClassId } = course;

    const lecturers = computed(() => (
      course.lecturers
        .map((lecturer) => {
          const { name, ...rest } = lecturer;

          return { ...rest, name: name[curLang.value] };
        })
        .filter((lecturer) => lecturer.name)
    ));
    const titleName = computed(() => course.title.name[curLang.value]);
    const category = computed(() => course.tag.category[curLang.value]);
    const postscript = computed(() => course.title.postscript[curLang.value]);
    const semester = computed(() => course.schedule.semester[curLang.value]);
    const times = computed(() => (
      (course.schedule.times[curLang.value] || '')
        .split(',')
        .map((time) => time.trim())
    ));
    const summary = computed(() => {
      const titleJp = course.title.name.ja || '';
      const summaryLang = ['研究会Ａ', '研究会Ｂ'].includes(titleJp) ? 'en' : curLang.value;

      return course.summary[summaryLang];
    });

    const { textTruncate, hasWidth, hasHeight } = props;
    const { cardClass, cardStyle } = useCard({ textTruncate, hasWidth, hasHeight }, context);

    const goResult = async () => {
      const searchQuery = new URLSearchParams({ id: yearClassId });

      await routerPush(`/course/search?${searchQuery.toString()}`);
    };

    return {
      cardClass,
      cardStyle,
      goResult,
      category,
      titleName,
      postscript,
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
div.course-category {
  font-size: 0.7rem;
}

div.course-title {
  font-size: 0.9rem;
}

span.course-postscript {
  color: #929292;
}

div.course-summary {
  font-size: 0.85rem;
}

span.course-lecturer {
  font-size: 0.85rem;
}

div.course-summary p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
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
