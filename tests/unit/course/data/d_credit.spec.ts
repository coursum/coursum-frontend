import { shallowMount } from '@vue/test-utils';

import { creditMock } from '../../../data';
import { i18n } from '../../../setup';

import DCredit from '@/components/course/data/d_credit.vue';

const correct = creditMock;

const options = {
  i18n,
  propsData: {
    credit: creditMock,
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('DCredit', () => {
  it('should render correct markup when prop is correct', () => {
    options.propsData.credit = correct;
    const wrapper = shallowMount(DCredit, options);

    const vChip = wrapper.find('v-chip-stub');
    expect(vChip.text()).toEqual(`${correct}credit`);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render anything when prop is falsy', () => {
    [undefined, null].forEach((falsyProp: undefined| null) => {
      options.propsData.credit = falsyProp;
      const wrapper = shallowMount(DCredit, options);

      const vChip = wrapper.find('v-chip-stub');
      expect(vChip.exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

// import DCredit from '@/components/course/data/d_credit.vue';

// import { shallowMount } from '@vue/test-utils';
// import { i18n } from '../../../setup';
// import { creditMock } from '../../../data';

// const options = {
//   i18n,
//   propsData: {
//     credit: creditMock,
//   },
// };

// describe('DCredit', () => {
//   it('should not render anything when prop is undefined', () => {
//     options.propsData.credit = undefined;
//     const wrapper = shallowMount(DCredit, options);

//     const span = wrapper.find('span');
//     expect(span.exists()).toBe(false);
//   });

//   it('should not render anything when prop is empty string', () => {
//     options.propsData.credit = null;
//     const wrapper = shallowMount(DCredit, options);

//     const span = wrapper.find('span');
//     expect(span.exists()).toBe(false);
//   });

//   it('should render title data when title prop is correct', () => {
//     const wrapper = shallowMount(DCredit, options);

//     const span = wrapper.find('span');
//     expect(span.text()).toBe(`${creditMock}credit`);
//   });
// });
