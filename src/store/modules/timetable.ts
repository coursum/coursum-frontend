const idsType: string[] = [];

const setTimetable = (ids: string[]) => {
  localStorage.setItem('timetable/ids', JSON.stringify(ids));
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
    getIdsFromLocalStorage(state: State) {
      const ids = localStorage.getItem('timetable/ids');

      if (ids !== null) {
        state.ids = JSON.parse(ids);
      }
    },
    addToTimetable(state: State, id: string) {
      state.ids = [...state.ids, id];

      setTimetable(state.ids);
    },
    removeFromTimetable(state: State, removeId: string) {
      state.ids = state.ids.filter((courseId: string) => courseId !== removeId);

      setTimetable(state.ids);
    },
  },
};
