import DScheduleSemester from '@/components/course/data/d_schedule_semester.vue';
import { shallowMount } from '@vue/test-utils';
import { i18n } from '../../../setup';
import { scheduleSemesterMock } from '../../../data';

const correct = scheduleSemesterMock.en;

const options = {
  i18n,
  propsData: {
    semester: scheduleSemesterMock,
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('DScheduleSemester', () => {
  it('should render correct markup when prop is correct', () => {
    options.propsData.semester.en = correct;
    const wrapper = shallowMount(DScheduleSemester, options);

    const span = wrapper.find('v-chip-stub');
    expect(span.text()).toEqual(correct);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render anything when prop is falsy', () => {
    [undefined, null, ''].forEach((falsyProp: undefined| null | string) => {
      options.propsData.semester.en = falsyProp;
      const wrapper = shallowMount(DScheduleSemester, options);

      const span = wrapper.find('v-chip-stub');
      expect(span.exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});