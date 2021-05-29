import { shallowMount } from '@vue/test-utils';

import { scheduleTimesMock } from '../../../data';
import { i18n } from '../../../setup';

import DScheduleTimes from '@/components/course/data/d_schedule_times.vue';

const correct = scheduleTimesMock.jp;

const options = {
  i18n,
  propsData: {
    times: scheduleTimesMock,
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('DScheduleTimes', () => {
  it('should render correct markup when prop is correct', () => {
    options.propsData.times.jp = correct;
    const wrapper = shallowMount(DScheduleTimes, options);

    const span = wrapper.find('v-chip-stub');
    expect(span.text()).toEqual('月1');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render anything when prop is falsy', () => {
    [undefined, null, ''].forEach((falsyProp: undefined| null | string) => {
      options.propsData.times.jp = falsyProp;
      const wrapper = shallowMount(DScheduleTimes, options);

      const span = wrapper.find('v-chip-stub');
      expect(span.exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
