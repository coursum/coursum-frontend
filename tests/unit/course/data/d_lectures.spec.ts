import { shallowMount } from '@vue/test-utils';

import { lecturersMock } from '../../../data';
import { i18n } from '../../../setup';

import DLectures from '@/components/course/data/d_lectures.vue';

const correct = lecturersMock[0].name.en;

const options = {
  i18n,
  propsData: {
    lecturers: lecturersMock,
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('DLectures', () => {
  it('should render correct markup when prop is correct', () => {
    options.propsData.lecturers[0].name.en = correct;
    const wrapper = shallowMount(DLectures, options);

    const span = wrapper.find('span');
    expect(span.text()).toEqual(correct);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render anything when prop is falsy', () => {
    [undefined, null, ''].forEach((falsyProp: string | null | undefined) => {
      options.propsData.lecturers[0].name.en = falsyProp;
      const wrapper = shallowMount(DLectures, options);

      const span = wrapper.find('span');
      expect(span.exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('should not render anything when prop is falsy', () => {
    [[]].forEach((falsyProp: never[]) => {
      options.propsData.lecturers = falsyProp;
      const wrapper = shallowMount(DLectures, options);

      const div = wrapper.find('div');
      expect(div.exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
