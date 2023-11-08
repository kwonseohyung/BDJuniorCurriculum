/* eslint-disable */
import axios from "axios";
import router from "@/routes/index";

const state = {
  memos: [],
  currentMemo: {
    title: "새 파일",
    content: "",
    indication: false,
  },
  currentTabIndex: 0,
  errormsg: "",
  userid: "",
};

const mutations = {
  updateMemos(state, memos) {
    state.memos = memos;
  },
  updateCurrentMemo(state, memo) {
    state.currentMemo = memo;
  },
  updateCurrentTabIndex(state, index) {
    state.currentTabIndex = index;
  },
  addMemo(state, newMemo) {
    state.memos.push(newMemo);
  },
  // indicateMemo(state) {
  //   state.memos[state.currentTabIndex].indication = true;
  // },
  selectTab(state, index) {
    state.memos[state.currentTabIndex] = { ...state.currentMemo };
    state.currentTabIndex = index;
    state.currentMemo = { ...state.memos[index] };
  },
  closeMemo(state, index) {
    if (index === state.currentTabIndex) {
      if (state.memos.length === 0) {
        state.memos.push({ title: "새 파일", content: "", indication: false });
      } else if (index > 0) {
        state.currentTabIndex = index - 1;
      }
    }
    state.memos.splice(index, 1);
    state.currentMemo = { ...state.memos[state.currentTabIndex] };
  },
  setErrorMessage(state, message) {
    console.log(state);
    state.errormsg = message;
  },
};

const actions = {
  async fetchMemos({ commit, dispatch }, userData) {
    try {
      const response = await axios.post("/api/memo/getMemo", {
        userid: userData.userid,
      });
      const data = response.data;
      console.log(data.data);
      if (data.message === "메모데이터") {
        const updatedMemos = data.data.map((memo) => {
          return { ...memo, isSaved: true };
        });
        console.log(updatedMemos);
        commit("updateMemos", updatedMemos);
        dispatch("newMemo");
        return;
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  },
  async saveMemo({ state, commit }) {
    console.log("saveMemo action");
    const title = state.currentMemo.title;
    const content = state.currentMemo.content;
    try {
      const response = await axios.post("/api/memo/save", {
        title: title,
        content: content,
        userid: sessionStorage.getItem("userid"),
      });
      const data = response.data;
      if (data.message === "파일 저장 성공") {
        state.currentMemo.isSaved = true;
      } else {
        commit("setErrorMessage", data.message);
        alert(state.errormsg);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async deleteMemo({ state, dispatch, commit }) {
    console.log("deleteMemo action");
    const titleToDelete = state.memos[state.currentTabIndex].title;
    try {
      const response = await axios.post("/api/memo/delete", {
        title: titleToDelete,
        userid: sessionStorage.getItem("userid"),
      });
      const data = response.data;
      if (data.message === "파일 삭제 성공") {
        state.memos.splice(state.currentTabIndex, 1);
        if (state.memos.length === 0) {
          dispatch("newMemo");
        } else if (state.currentTabIndex > 0) {
          dispatch("selectTab", state.currentTabIndex - 1);
        } else {
          dispatch("selectTab", 0);
        }
      } else {
        // 삭제 실패
        commit("setErrorMessage", data.message);
        alert(state.errormsg);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async openMemo({ state, commit }) {
    console.log("openMemo action");
    const title = prompt("파일 제목을 입력하세요.");
    if (title) {
      try {
        const response = await axios.post("/api/memo/open", {
          userid: sessionStorage.getItem("userid"),
          title: title,
        });
        const data = response.data;
        if (data.message === "파일 로딩 성공") {
          const newMemo = {
            title: title,
            content: data.data,
            // indication: false,
            // isSaved: true,
          };
          state.memos.push(newMemo);
          commit("updateCurrentMemo", { ...newMemo });
          commit("updateCurrentTabIndex", state.memos.length - 1);
        } else {
          // 열기 실패
          commit("setErrorMessage", data.message);
          alert(state.errormsg);
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  async saveAsMemo({ state, commit }) {
    console.log("saveAs action");
    const newTitle = prompt("파일 이름을 입력하세요:");

    if (newTitle === "") {
      alert("메모 제목을 입력하세요.");
      return;
    }

    if (newTitle !== null) {
      try {
        const response = await axios.post("/api/memo/saveAs", {
          title: newTitle,
          content: state.currentMemo.content,
          userid: sessionStorage.getItem("userid"),
        });
        const data = response.data;
        if (data.message === "파일 저장 성공") {
          commit("updateCurrentMemo", {
            ...state.currentMemo,
            title: newTitle,
            isSaved: true,
          });
          //
        } else {
          // 저장 실패
          commit("setErrorMessage", data.message);
          alert(state.errormsg);
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  newMemo({ commit, state }) {
    console.log("새파일클릭");
    const newMemo = { title: "새 파일", content: "", indication: false };
    commit("addMemo", newMemo);
    state.currentMemo = { ...newMemo };
    state.currentTabIndex = state.memos.length - 1;
  },
  // indicate({ commit, state }) {
  //   commit("indicateMemo");
  // },
  selectTab({ commit, state }, index) {
    commit("selectTab", index);
  },
  closeMemo({ commit, state }, index) {
    if (index === state.currentTabIndex) {
      if (state.memos.length === 0) {
        commit("addMemo", { title: "새 파일", content: "", indication: false });
      } else if (index > 0) {
        commit("selectTab", index - 1);
      }
    }
    commit("closeMemo", index);
  },
  async logout({ state }) {
    const savedTabs = state.memos.filter((memo) => memo.isSaved);
    const activityMemoTitles = savedTabs.map((memo) => memo.title);
    try {
      await axios.post("/api/users/logout", {
        userid: sessionStorage.getItem("userid"),
        activityMemoTitles: activityMemoTitles,
      });

      sessionStorage.removeItem(state.userid);
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
