import DetailShow from '@/components/detail/detail_show.vue';
import { shallowMount } from '@vue/test-utils';
import { i18n } from '../../setup';

import {
  registrationMock, relatedMock, classroomMock, typesMock, tagMock, curriculumCodeMock,
} from '../../data';

const options = {
  i18n,
  propsData: {
    registration: registrationMock,
    related: relatedMock,
    classroom: classroomMock,
    types: typesMock,
    tag: tagMock,
    curriculumCode: curriculumCodeMock,
  },
  mocks: {
    $t: (msg: string) => msg,
  },
};

describe('CourseShow', () => {
  it('should render correct markup when prop is correct', () => {
    const wrapper = shallowMount(DetailShow, options);

    expect(wrapper.element).toMatchSnapshot();
  });
});
