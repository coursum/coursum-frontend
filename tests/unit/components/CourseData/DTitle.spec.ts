import DTitle from '@/components/CourseData/DTitle.vue';

import { mount } from '@vue/test-utils';

describe('DTitle', () => {
  it('should not render anything with title prop is falsy (undefined)', () => {
    const wrapper = mount(DTitle, {
      propsData: {
        title: undefined,
      },
    });

    const span = wrapper.find('span');
    expect(span.exists()).toBe(false);
  });

  it('should not render anything with title prop is falsy ("")', () => {
    const wrapper = mount(DTitle, {
      propsData: {
        title: '',
      },
    });

    const span = wrapper.find('span');
    expect(span.exists()).toBe(false);
  });

  it('should not render anything with title prop is falsy (null)', () => {
    const wrapper = mount(DTitle, {
      propsData: {
        postscript: null,
      },
    });

    const span = wrapper.find('span');
    expect(span.exists()).toBe(false);
  });

  it('should render title data with title prop is not falsy', () => {
    const wrapper = mount(DTitle, {
      propsData: {
        title: 'プログラミング言語論',
      },
    });
    const span = wrapper.find('span');
    expect(span.text()).toBe('プログラミング言語論');
  });
});
