// import { createStore } from "vuex";
// import axios from "axios";

// export const store = createStore({
//   state: {
//     userid: "",
//     password: "",
//     errormsg: "",
//   },

//   mutations: {
//     setUserId(state, userid) {
//       state.userid = userid;
//     },
//     setPassword(state, password) {
//       state.password = password;
//     },
//     setErrorMessage(state, message) {
//       state.errormsg = message;
//     },
//   },
//   actions: {
//     async login({ commit }, userData) {
//       try {
//         const response = await axios.post("/api/users/login", userData);
//         const data = response.data;
//         if (data.message === "로그인 성공") {
//           sessionStorage.setItem("userid", userData.userid);
//         } else {
//           commit("setErrorMessage", data.message);
//         }
//         return data;
//       } catch (error) {
//         console.error("FETCH ERROR", error);
//         throw error;
//       }
//     },
//   },
// });

import { createStore } from "vuex";
import user from "./user/index";
import memo from "./memo/index";

export const store = createStore({
  modules: {
    user: user,
    memo: memo,
  },
  // ...
});
