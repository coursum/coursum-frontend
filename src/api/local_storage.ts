import { ValidIdParams } from '@/assets/CourseInfo';

const setToLocalStrage = (ids: ValidIdParams[]) => {
  localStorage.setItem('timetable/ids', JSON.stringify(ids));
};

const getFromLocalStrage = (): ValidIdParams[] => {
  const ids: string | null = localStorage.getItem('timetable/ids');
  let idObjs: ValidIdParams[] = [];

  if (ids !== null) {
    idObjs = JSON.parse(ids);
  }

  return idObjs;
};

export default {
  addToLocalStrage(addId: ValidIdParams) {
    const idObjs: ValidIdParams[] = getFromLocalStrage();

    idObjs.push(addId);

    setToLocalStrage(idObjs);
  },
  removeFromLocalStrage(removeId: ValidIdParams) {
    const idObjs: ValidIdParams[] = getFromLocalStrage()
      .filter((courseId: ValidIdParams) => `{"title":"${courseId.title}","teacher":"${courseId.teacher}"}` !== `{"title":"${removeId.title}","teacher":"${removeId.teacher}"}`);

    setToLocalStrage(idObjs);
  },
};
