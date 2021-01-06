import CourseShow from '@/components/course/course_show.vue';
import { shallowMount, mount } from '@vue/test-utils';
import { i18n } from '../../setup';

import { courseDataMock } from '../../data';

const options = {
  i18n,
  propsData: {
    courseData: courseDataMock,
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('CourseShow', () => {
  it('should render correct markup when prop is correct', () => {
    const wrapper = shallowMount(CourseShow, options);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correct markup when prop is correct', () => {
    const wrapper = mount(CourseShow, options);

    expect(wrapper.element).toMatchSnapshot();
  });
});
