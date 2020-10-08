import formatDistance from "date-fns/formatDistance";

const getBreaksFormated = (breaks, name, type) => {
  const attendance = breaks.map(rest => {
    const duration = formatDistance(rest.in, rest.out);
    const breakHistoryTemplate = { ...rest, name, type, duration };

    return breakHistoryTemplate;
  });
  return attendance;
};

const state = {
  attendance: []
};

const mutations = {
  ADD_ATTENDANCE(state, data) {
    state.attendance = [...state.attendance, data];
  },
  UPDATE_ATTENDANCE(state, data) {
    let attendance = [...state.attendance];
    let busIndex = attendance.findIndex(item => item.id === data.id);
    attendance[busIndex] = { ...data };
    state.attendance = [...attendance];
  }
};

const actions = {
  addAttendance({ commit }, payload) {
    commit("ADD_ATTENDANCE", payload);
  },
  updateAttendance({ commit }, payload) {
    commit("UPDATE_ATTENDANCE", payload);
  }
};

const getters = {
  activeAttendance(state) {
    return state.attendance.filter(item => !!item.active);
  },
  inactiveAttendance(state) {
    return state.attendance.filter(item => !item.active);
  },
  historyAttendance(state, getters) {
    return getters.inactiveAttendance
      .map(attendance => {
        const { presence, breaks, lunch, name } = attendance;
        const historyTemplate = {
          ...presence,
          name,
          type: "In/out",
          duration: formatDistance(presence.in, presence.out)
        };
        const breaksFormated = getBreaksFormated(breaks, name, "Break");
        let lunchFormated = [];
        if (lunch.in !== "") {
          lunchFormated = getBreaksFormated([lunch], name, "Lunch");
        }
        return [historyTemplate, ...breaksFormated, ...lunchFormated];
      })
      .flat();
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
