import axios from "axios";

const state = {
  userid: "",
  password: "",
  errormsg: "",
};

const mutations = {
  setUserId(state, userid) {
    state.userid = userid;
  },
  setPassword(state, password) {
    state.password = password;
  },
  setErrorMessage(state, message) {
    state.errormsg = message;
  },
};

const actions = {
  async login({ commit }, userData) {
    try {
      const response = await axios.post("/api/users/login", userData);
      const data = response.data;
      if (data.message === "로그인 성공") {
        sessionStorage.setItem("userid", userData.userid);
      } else {
        commit("setErrorMessage", data.message);
      }
      return data;
    } catch (error) {
      console.error("FETCH ERROR", error);
      throw error;
    }
  },
  async sign({ commit }, userData) {
    try {
      const response = await axios.post("/api/users/sign", userData);
      const data = response.data;
      if (data.message === "회원가입 성공") {
        // 회원가입 성공
        //
      } else {
        commit("setErrorMessage", data.message);
      }
      return data;
    } catch (error) {
      console.error("FETCH ERROR", error);
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
