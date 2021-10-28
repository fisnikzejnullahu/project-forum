import Api from "@/API";
import { log } from "util";

const state = {
  token: "",
  user: null
};

const mutations = {
  setJwtToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  }
};

const actions = {
  async login({ commit }, user) {
    var result = await Api.login(user);

    if (result.success === true) {
      if (result.token) {
        commit("setJwtToken", result.token);
        user.role = result.user.role;
        commit("setUser", user);
        localStorage.token = result.token;
      }
    }
    return result;
  },
  logout({ commit }) {
    commit("setJwtToken", "");
    commit("setUser", null);
  }
};

const getters = {
  isAdmin() {
    return state.user.role === "Admin";
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
