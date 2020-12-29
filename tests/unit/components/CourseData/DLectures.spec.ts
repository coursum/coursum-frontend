import DLectures from '@/components/CourseData/DLectures.vue';

import { mount } from '@vue/test-utils';
import { i18n } from '../../../setup';

const lecturersMock = [{
  imgUrl: '',
  name: { en: '', jp: '萩野 達也', kana: 'ハギノ タツヤ' },
  id: '',
  email: 'hagino@sfc.keio.ac.jp',
  inCharge: true,
}];

describe('DLectures', () => {
  it('should not render anything when prop is falsy (undefined)', () => {
    const wrapper = mount(DLectures, {
      i18n,
      propsData: {
        lecturers: undefined,
      },
    });

    const div = wrapper.find('div');
    expect(div.exists()).toBe(false);
  });

  it('should not render anything when prop is falsy (null)', () => {
    const wrapper = mount(DLectures, {
      i18n,
      propsData: {
        lecturers: null,
      },
    });

    const div = wrapper.find('div');
    expect(div.exists()).toBe(false);
  });

  it('should not render anything when prop is falsy ([])', () => {
    const wrapper = mount(DLectures, {
      i18n,
      propsData: {
        lecturers: [],
      },
    });

    const div = wrapper.find('div');
    expect(div.exists()).toBe(false);
  });

  it('should render data when prop is not falsy', () => {
    const wrapper = mount(DLectures, {
      i18n,
      propsData: {
        lecturers: lecturersMock,
      },
    });

    const div = wrapper.findAll('span').at(1);
    expect(div.text()).toBe('萩野 達也');
  });
});
