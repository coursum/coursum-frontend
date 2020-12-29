import DScheduleSemester from '@/components/CourseData/DScheduleSemester.vue';

import { mount } from '@vue/test-utils';

describe('DScheduleSemester', () => {
  it('should not render anything when prop is falsy (undefined)', () => {
    const wrapper = mount(DScheduleSemester, {
      propsData: {
        semester: undefined,
      },
    });

    const span = wrapper.find('span');
    expect(span.exists()).toBe(false);
  });

  it('should not render anything when prop is falsy ("")', () => {
    const wrapper = mount(DScheduleSemester, {
      propsData: {
        semester: '',
      },
    });

    const span = wrapper.find('span');
    expect(span.exists()).toBe(false);
  });

  it('should not render anything when prop is falsy (null)', () => {
    const wrapper = mount(DScheduleSemester, {
      propsData: {
        semester: null,
      },
    });

    const span = wrapper.find('span');
    expect(span.exists()).toBe(false);
  });
});
