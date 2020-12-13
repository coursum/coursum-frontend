// Components
import DCategory from '@/components/CourseData/Primary/DCategory.vue';

// Utilities
import { shallowMount } from '@vue/test-utils';
import { i18n, store } from '../setup';

describe('DCategory', () => {
  it('with valid data render category data', () => {
    const wrapper = shallowMount(DCategory, {
      store,
      i18n,
      propsData: {
        idx: 0,
      },
    });
    const div = wrapper.find('div');
    const data = store.state.courseDatas[0];
    expect(div.text()).toBe(data.category.en);
  });
});
