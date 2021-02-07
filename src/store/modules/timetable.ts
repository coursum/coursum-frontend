const idsType: string[] = [];

const setTimetable = (ids: string[]) => {
  localStorage.setItem('timetable/ids', JSON.stringify(ids));
};

const getIdsFromLocalStorage = (state: State) => {
  const ids = localStorage.getItem('timetable/ids');

  if (ids !== null) {
    state.ids = JSON.parse(ids);
  }
};

interface State {
  ids: string[];
}

export default {
  namespaced: true,
  state: {
    ids: idsType,
  },
  mutations: {
    getIdsFromLocalStorage,
    addToTimetable(state: State, id: string) {
      state.ids = [...state.ids, id];

      setTimetable(state.ids);
      getIdsFromLocalStorage(state);
    },
    removeFromTimetable(state: State, removeId: string) {
      state.ids = state.ids.filter((courseId: string) => courseId !== removeId);

      setTimetable(state.ids);
      getIdsFromLocalStorage(state);
    },
  },
};
