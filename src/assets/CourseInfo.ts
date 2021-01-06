export interface Basic {
  en: string | null | undefined;
  jp: string | null | undefined;
  kana: string | null | undefined;
}

export interface Lecturer {
  imgUrl: string | null | undefined;
  name: Basic;
  id: string | null | undefined;
  email: string | null | undefined;
  inCharge: boolean | null | undefined;
}

export interface Title {
  postscript: Basic;
  name: Basic;
}

export interface Schedule {
  year: number | null | undefined;
  span: Basic;
  semester: Basic;
  times: Basic;
}

export interface Registration {
  number: null | undefined;
  suggestion: Basic;
  requirement: Basic;
  prerequisite: null | undefined;
}

export interface Tag {
  giga: boolean | undefined;
}

export interface CourseInfo {
  category: Basic;
  language: Basic;
  lecturers: Lecturer[] | never[];
  title: Title;
  schedule: Schedule;
  related: null | undefined;
  registration: Registration;
  classroom: string | null | undefined;
  summary: Basic;
  types: null | undefined;
  yearClassId: null | undefined;
  tag: Tag;
  curriculumCode: string | null | undefined;
  credit: number | null | undefined;
}

export const basicTemplate: Basic = { en: undefined, jp: undefined, kana: undefined };

export const courseTemplate: CourseInfo = {
  category: basicTemplate,
  language: basicTemplate,
  lecturers: [{
    imgUrl: undefined,
    name: basicTemplate,
    id: undefined,
    email: undefined,
    inCharge: undefined,
  }],
  title: {
    postscript: basicTemplate,
    name: basicTemplate,
  },
  schedule: {
    year: undefined,
    span: basicTemplate,
    semester: basicTemplate,
    times: basicTemplate,
  },
  related: undefined,
  registration: {
    number: undefined,
    suggestion: basicTemplate,
    requirement: basicTemplate,
    prerequisite: undefined,
  },
  classroom: undefined,
  summary: basicTemplate,
  types: undefined,
  yearClassId: undefined,
  tag: { giga: undefined },
  curriculumCode: undefined,
  credit: undefined,
};
