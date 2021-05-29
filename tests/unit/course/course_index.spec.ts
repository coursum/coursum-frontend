import { mount, shallowMount } from '@vue/test-utils';

import CourseIndex from '@/components/course/course_index.vue';

jest.mock('@/api/request');

describe('CourseIndex', () => {
  it('should render correct markup when prop is correct', () => {
    const wrapper = shallowMount(CourseIndex);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correct markup when prop is correct', () => {
    const wrapper = mount(CourseIndex);

    expect(wrapper.element).toMatchSnapshot();
  });
});
