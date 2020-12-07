interface Basic {
  en: string | null;
  jp: string | null;
  kana: string |null;
}

interface Lecturer {
  imgUrl: string | null;
  name: Basic;
  id: string | null;
  email: string | null;
  inCharge: boolean | null;
}

interface Title {
  postscript: Basic;
  name: Basic;
}

interface Schedule {
  year: number | null;
  span: Basic;
  semester: Basic;
  times: Basic;
}

interface Registration {
  number: null;
  suggestion: Basic;
  requirement: Basic;
  prerequisite: null;
}

export interface CourseInfo {
  category: Basic;
  language: Basic;
  lecturers: Lecturer[];
  title: Title;
  schedule: Schedule;
  related: null;
  registration: Registration;
  classroom: string | null;
  summary: Basic;
  types: null;
  yearClassId: null;
  tag: {giga: boolean };
  curriculumCode: string | null;
  credit: number | null;
}
