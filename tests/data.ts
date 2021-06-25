import type {
  Basic, CourseInfo, Lecturer, Registration, Schedule, Tag, Title,
} from '@/types/CourseInfo';

const categoryMock: Basic = { en: 'category en', jp: 'category jp', kana: 'category kana' };

const languageMock: Basic = { en: 'language en', jp: 'language jp', kana: 'language kana' };

const lecturersMock: Lecturer[] | never[] = [{
  imgUrl: 'imgUrl',
  name: { en: 'name en', jp: 'name jp', kana: 'name kana' },
  id: 'id',
  email: 'email',
  inCharge: true,
}];

const titlePostscriptMock: Basic = { en: 'postscript en', jp: 'postscript jp', kana: 'postscript kana' };
const titleNameMock: Basic = { en: 'name en', jp: 'name jp', kana: 'name kana' };

const titleMock: Title = {
  postscript: titlePostscriptMock,
  name: titleNameMock,
};

const scheduleSemesterMock: Basic = { en: 'semester en', jp: 'semester jp', kana: 'semseter kana' };

const scheduleTimesMock: Basic = { en: 'times en', jp: '月曜日１時限', kana: 'times kana' };

const scheduleMock: Schedule = {
  year: 2020,
  span: { en: 'span en', jp: 'span jp', kana: 'span kana' },
  semester: scheduleSemesterMock,
  times: scheduleTimesMock,
};

const relatedMock: null | undefined = null;

const registrationMock: Registration = {
  number: null,
  suggestion: { en: 'suggestion en', jp: 'suggestion jp', kana: 'suggestion kana' },
  requirement: { en: 'requirement en', jp: 'requirement jp', kana: 'requirement kana' },
  prerequisite: null,
};

const classroomMock: string | null | undefined = 'classroom';

const summaryMock: Basic = {
  en: 'summary en',
  jp: 'summary jp',
  kana: 'summary kana',
};

const typesMock: null | undefined = null;

const yearClassIdMock: null | undefined = null;

const tagMock: Tag = { giga: true };

const curriculumCodeMock: string | null | undefined = 'curriculumCode';

const creditMock: number | null | undefined = 2;

const courseDataMock: CourseInfo = {
  category: categoryMock,
  language: languageMock,
  lecturers: lecturersMock,
  title: titleMock,
  schedule: scheduleMock,
  related: relatedMock,
  registration: registrationMock,
  classroom: classroomMock,
  summary: summaryMock,
  types: typesMock,
  yearClassId: yearClassIdMock,
  tag: tagMock,
  curriculumCode: curriculumCodeMock,
  credit: creditMock,
};

const courseDatasMock: CourseInfo[] = [
  courseDataMock,
  courseDataMock,
  courseDataMock,
  courseDataMock,
  courseDataMock,
  courseDataMock,
  courseDataMock,
  courseDataMock,
  courseDataMock,
  courseDataMock,
  courseDataMock,
  courseDataMock,
];

export {
  courseDatasMock,
  courseDataMock,
  scheduleTimesMock,
  scheduleSemesterMock,
  titlePostscriptMock,
  titleNameMock,
  categoryMock,
  languageMock,
  lecturersMock,
  titleMock,
  scheduleMock,
  relatedMock,
  registrationMock,
  classroomMock,
  summaryMock,
  typesMock,
  yearClassIdMock,
  tagMock,
  curriculumCodeMock,
  creditMock,
};
