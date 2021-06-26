type Nullish = null | undefined;

interface I18nData {
  ja: string | Nullish;
  en: string | Nullish;
  kana?: string | Nullish;
}

interface Title {
  name: I18nData;
  postscript: I18nData;
}

interface Lecturer {
  id: string | Nullish;
  imgUrl: string | Nullish;
  name: I18nData;
  email: string | Nullish;
  inCharge: boolean | Nullish;
}

interface Schedule {
  year: number | Nullish;
  semester: I18nData;
  times: I18nData;
  span: I18nData;
}

interface Registration {
  number: string | Nullish;
  prerequisite: {
    mandatory: string | Nullish;
    recommended: string | Nullish;
  };
  requirement: I18nData;
  suggestion: I18nData;
}

interface Tag {
  curriculumCode: string | Nullish;
  category: I18nData;
  giga: boolean | Nullish;
}

export interface CourseInfo {
  title: Title;
  lecturers: Lecturer[];
  schedule: Schedule;
  classroom: string | Nullish;
  credit: number | Nullish;
  language: I18nData;
  summary: I18nData;
  types: I18nData;
  registration: Registration;
  related: string | Nullish;
  yearClassId: string; // non nullish
  syllabusURL: string | Nullish;
  tag: Tag;
}

export const i18nDataTemplate: I18nData = {
  ja: undefined,
  en: undefined,
};

export const courseTemplate: CourseInfo = {
  title: {
    postscript: i18nDataTemplate,
    name: i18nDataTemplate,
  },
  lecturers: [
    {
      id: undefined,
      imgUrl: undefined,
      name: i18nDataTemplate,
      email: undefined,
      inCharge: undefined,
    },
  ],
  schedule: {
    year: undefined,
    semester: i18nDataTemplate,
    times: i18nDataTemplate,
    span: i18nDataTemplate,
  },
  classroom: undefined,
  credit: undefined,
  language: i18nDataTemplate,
  types: i18nDataTemplate,
  summary: i18nDataTemplate,
  registration: {
    number: undefined,
    prerequisite: {
      mandatory: undefined,
      recommended: undefined,
    },
    requirement: i18nDataTemplate,
    suggestion: i18nDataTemplate,
  },
  related: undefined,
  yearClassId: '2000_00000',
  syllabusURL: undefined,
  tag: {
    curriculumCode: undefined,
    category: i18nDataTemplate,
    giga: undefined,
  },
};

export interface ValidIdParams {
  title: string;
  teacher: string;
}
