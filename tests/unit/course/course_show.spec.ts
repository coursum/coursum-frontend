import { mount, shallowMount } from '@vue/test-utils';

import { courseDataMock } from '../../data';
import { i18n } from '../../setup';

import CourseShow from '@/components/course/course_show.vue';

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
