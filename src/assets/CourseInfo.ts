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
  lecturers: Lecturer[];
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
