import { shallowMount } from '@vue/test-utils';

import { categoryMock } from '../../../data';
import { i18n } from '../../../setup';

import DCategory from '@/components/course/data/d_category.vue';

const correct = categoryMock.en;

const options = {
  i18n,
  propsData: {
    category: categoryMock,
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('DCategory', () => {
  it('should render correct markup when prop is correct', () => {
    options.propsData.category.en = correct;
    const wrapper = shallowMount(DCategory, options);

    const div = wrapper.find('div');
    expect(div.text()).toEqual(correct);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correct markup when prop is falsy', () => {
    [undefined, null, ''].forEach((falsyProp: string | null | undefined) => {
      options.propsData.category.en = falsyProp;
      const wrapper = shallowMount(DCategory, options);

      const div = wrapper.find('div');
      expect(div.text()).toEqual('others');
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
