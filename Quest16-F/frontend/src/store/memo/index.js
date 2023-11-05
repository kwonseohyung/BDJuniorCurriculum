// store/memo/index.js

import axios from "axios";

export default {
  state: {
    memos: [],
    currentMemo: {
      title: "새 파일",
      content: "",
      indication: false,
    },
    currentTabIndex: 0,
  },

  mutations: {
    updateMemos(state, memos) {
      state.memos = memos;
    },
    updateCurrentMemo(state, memo) {
      state.currentMemo = memo;
    },
    updateCurrentTabIndex(state, index) {
      state.currentTabIndex = index;
    },
  },
  actions: {
    async fetchMemos({ commit }) {
      try {
        // 서버에서 메모 목록을 가져오는 비동기 작업
        const response = await axios.get("/api/memos");
        const memos = response.data;
        commit("updateMemos", memos);
      } catch (error) {
        console.error("Error fetching memos:", error);
      }
    },
    async saveMemo({ state }) {
      const title = state.currentMemo.title;
      const content = state.currentMemo.content;
      try {
        // 서버에 메모를 저장하는 비동기 작업
        const response = await axios.post("/api/memo/save", {
          title: title,
          content: content,
          userid: sessionStorage.getItem("userid"),
        });
        const data = response.data;
        if (data.message === "파일 저장 성공") {
          state.currentMemo.isSaved = true;
        } else {
          // 저장 실패한 경우에 대한 처리
        }
      } catch (error) {
        console.error("Error saving memo:", error);
      }
    },
    async deleteMemo({ state, dispatch }) {
      const titleToDelete = state.memos[state.currentTabIndex].title;
      try {
        // 서버로 메모 삭제 요청 보내는 비동기 작업
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
          // 삭제 실패한 경우에 대한 처리
        }
      } catch (error) {
        console.error("Error deleting memo:", error);
      }
    },
    async openMemo({ state, commit }) {
      const title = prompt("파일 제목을 입력하세요.");
      if (title) {
        try {
          // 서버로 메모 열기 요청 보내는 비동기 작업
          const response = await axios.post("/api/memo/open", {
            userid: sessionStorage.getItem("userid"),
            title: title,
          });
          const data = response.data;
          if (data.message === "파일 로딩 성공") {
            const newMemo = {
              title: title,
              content: data.data,
              indication: false,
              isSaved: true,
            };
            state.memos.push(newMemo);
            commit("updateCurrentMemo", { ...newMemo });
            commit("updateCurrentTabIndex", state.memos.length - 1);
          } else {
            // 열기 실패한 경우에 대한 처리
          }
        } catch (error) {
          console.error("Error opening memo:", error);
        }
      }
    },
    async saveAsMemo({ state, commit }) {
      const newTitle = prompt("파일 이름을 입력하세요:");

      if (newTitle === "") {
        alert("메모 제목을 입력하세요.");
        return;
      }

      if (newTitle !== null) {
        try {
          // 서버로 메모 저장 요청 보내는 비동기 작업
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
          } else {
            // 저장 실패한 경우에 대한 처리
          }
        } catch (error) {
          console.error("Error saving memo:", error);
        }
      }
    },
  },
  getters: {
    hasUnsavedMemos(state) {
      return state.memos.some((memo) => !memo.isSaved);
    },
  },
};
