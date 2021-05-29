import { shallowMount } from '@vue/test-utils';

import { summaryMock, titleMock } from '../../../data';
import { i18n } from '../../../setup';

import DSummary from '@/components/course/data/d_summary.vue';

const correct = summaryMock.en;

const options = {
  i18n,
  propsData: {
    summary: summaryMock,
    title: titleMock,
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('DSummary', () => {
  it('should render correct markup when prop is correct', () => {
    options.propsData.summary.en = correct;
    const wrapper = shallowMount(DSummary, options);

    const span = wrapper.find('div');
    expect(span.text()).toEqual(correct);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render anything when prop is falsy', () => {
    [undefined, null, ''].forEach((falsyProp: undefined| null | string) => {
      options.propsData.summary.en = falsyProp;
      const wrapper = shallowMount(DSummary, options);

      const span = wrapper.find('div');
      expect(span.exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
