import DCredit from '@/components/CourseData/DCredit.vue';

import { mount } from '@vue/test-utils';
import { i18n } from '../../../setup';

describe('DCredit', () => {
  it('should not render anything when prop is falsy (undefined)', () => {
    const wrapper = mount(DCredit, {
      i18n,
      propsData: {
        credit: undefined,
      },
    });

    const span = wrapper.find('span');
    expect(span.exists()).toBe(false);
  });

  it('should not render anything when prop is falsy (empty string)', () => {
    const wrapper = mount(DCredit, {
      i18n,
      propsData: {
        credit: null,
      },
    });

    const span = wrapper.find('span');
    expect(span.exists()).toBe(false);
  });

  it('should render title data when title prop is not falsy', () => {
    const wrapper = mount(DCredit, {
      i18n,
      propsData: {
        credit: 1,
      },
    });
    const span = wrapper.find('span');
    expect(span.text()).toBe('1credit');
  });
});
