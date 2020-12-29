import DPostscript from '@/components/CourseData/DPostscript.vue';

import { mount } from '@vue/test-utils';

describe('DPostscript', () => {
  it('should not render anything when prop is falsy (undefined)', () => {
    const wrapper = mount(DPostscript, {
      propsData: {
        postscript: undefined,
      },
    });

    const span = wrapper.find('span');
    expect(span.exists()).toBe(false);
  });

  it('should not render anything when prop is falsy ("")', () => {
    const wrapper = mount(DPostscript, {
      propsData: {
        postscript: '',
      },
    });

    const span = wrapper.find('span');
    expect(span.exists()).toBe(false);
  });

  it('should not render anything when prop is falsy (null)', () => {
    const wrapper = mount(DPostscript, {
      propsData: {
        postscript: null,
      },
    });

    const span = wrapper.find('span');
    expect(span.exists()).toBe(false);
  });

  it('should render data when prop is not falsy', () => {
    const wrapper = mount(DPostscript, {
      propsData: {
        postscript: 'GIGA',
      },
    });

    const span = wrapper.find('span');
    expect(span.text()).toBe('GIGA');
  });
});
