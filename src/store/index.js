import { createStore } from "vuex";
import { fetchMockConfig } from "@/mockConfig";

export default createStore({
  state: {
    config: {},
    cookies: {},
  },
  mutations: {
    setConfig(state, config) {
      state.config = config;
    },
    setCookies(state, cookies) {
      state.cookies = cookies;
    },
  },
  actions: {
    async loadConfig({ commit }) {
      const data = await fetchMockConfig();
      commit("setConfig", data.config);
      commit("setCookies", data.cookies);
    },
  },
  getters: {
    config: (state) => state.config,
    cookies: (state) => state.cookies,
  },
});
