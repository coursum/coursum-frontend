import { shallowMount } from '@vue/test-utils';

import { titlePostscriptMock } from '../../../data';
import { i18n } from '../../../setup';

import DPostscript from '@/components/course/data/d_postscript.vue';

const correct = titlePostscriptMock.en;

const options = {
  i18n,
  propsData: {
    postscript: titlePostscriptMock,
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('DPostscript', () => {
  it('should render correct markup when prop is correct', () => {
    options.propsData.postscript.en = correct;
    const wrapper = shallowMount(DPostscript, options);

    const span = wrapper.find('span');
    expect(span.text()).toEqual(correct);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render anything when prop is falsy', () => {
    [undefined, null, ''].forEach((falsyProp: undefined| null | string) => {
      options.propsData.postscript.en = falsyProp;
      const wrapper = shallowMount(DPostscript, options);

      const span = wrapper.find('span');
      expect(span.exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
