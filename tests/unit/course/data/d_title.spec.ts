import DTitle from '@/components/course/data/d_title.vue';
import { shallowMount } from '@vue/test-utils';
import { i18n } from '../../../setup';
import { titleNameMock } from '../../../data';

const correct = titleNameMock.en;

const options = {
  i18n,
  propsData: {
    title: titleNameMock,
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('DTitle', () => {
  it('should render correct markup when prop is correct', () => {
    options.propsData.title.en = correct;
    const wrapper = shallowMount(DTitle, options);

    const span = wrapper.find('div');
    expect(span.text()).toEqual(correct);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render anything when prop is falsy', () => {
    [undefined, null, ''].forEach((falsyProp: undefined| null | string) => {
      options.propsData.title.en = falsyProp;
      const wrapper = shallowMount(DTitle, options);

      const span = wrapper.find('div');
      expect(span.exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
