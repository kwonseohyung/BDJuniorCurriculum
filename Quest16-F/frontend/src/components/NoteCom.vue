<template>
  <div class="main">
    <div class="button-bar">
      <button class="mainButton" @click="newMemo">새 파일</button>
      <button class="mainButton" @click="openMemo">열기</button>
      <button class="mainButton" @click="saveAsMemo">저장(NEW)</button>
      <button class="mainButton" @click="saveMemo">저장</button>
      <button class="mainButton" @click="deleteMemo">삭제</button>
      <button class="mainButton" @click="logout">로그아웃</button>
    </div>

    <div class="memo">
      <div class="memo-tabs">
        <div
          v-for="(memo, index) in memos"
          :key="index"
          class="tab"
          @click="selectTab(index)"
          :class="{ active: index === currentTabIndex }"
        >
          {{ memo.title }}
          <span class="close" @click.stop="closeMemo(index)">X</span>
          <span class="indicator" v-if="memo.indication">*</span>
        </div>
      </div>
      <div class="memo-editor">
        <textarea
          v-model="currentMemo.content"
          @keypress="indicate()"
          placeholder="메모 내용"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      //memos: [{ title: '새 파일', content: '' }],
      memos: [],
      currentMemo: {
        title: "새 파일",
        content: "",
        indication: false,
      },
      currentTabIndex: 0,
      activity_data: [],
    };
  },
  created() {
    const noteData = JSON.parse(history.state.noteData);
    const modifiedData = noteData.map((item) => ({ ...item, isSaved: true }));
    this.memos = modifiedData;
    //this.currentMemo=this.memos[this.memos.length-1];
    this.newMemo();
    console.log(this.indication);
  },
  methods: {
    newMemo() {
      const newMemo = { title: "새 파일", content: "", indication: false };
      this.memos.push(newMemo);
      this.currentMemo = { ...newMemo };
      this.currentTabIndex = this.memos.length - 1;
    },
    indicate() {
      this.memos[this.currentTabIndex].indication = true;
    },
    selectTab(index) {
      this.memos[this.currentTabIndex] = { ...this.currentMemo };
      this.currentTabIndex = index;
      this.currentMemo = { ...this.memos[index] };
    },

    closeMemo(index) {
      if (index === this.currentTabIndex) {
        if (this.memos.length === 0) {
          // 남은 탭이 없으면 새 메모 생성
          this.newMemo();
        } else if (index > 0) {
          // 왼쪽에 탭이 있으면 해당 탭을 선택
          this.selectTab(index - 1);
        }
      } else if (index < this.currentTabIndex) {
        // 현재 탭의 왼쪽 탭을 삭제한 경우
        // this.currentTabIndex--;
      }

      this.memos.splice(index, 1);
      this.currentMemo = { ...this.memos[this.currentTabIndex] };
    },

    deleteMemo() {
      const titleToDelete = this.memos[this.currentTabIndex].title;
      // 서버로 메모 삭제 요청 보내기
      axios
        .post("/api/memo/delete", {
          title: titleToDelete,
          userid: sessionStorage.getItem("userid"),
        })
        .then((response) => {
          const data = response.data;
          console.log(data.message);
          if (data.message == "파일 삭제 성공") {
            this.memos.splice(this.currentTabIndex, 1);
            if (this.memos.length === 0) {
              this.newMemo();
            } else if (this.currentTabIndex > 0) {
              this.selectTab(this.currentTabIndex - 1);
            } else {
              this.selectTab(0);
            }
          } else {
            this.errormsg = data.message;
            alert(this.errormsg);
          }
        })
        .catch((error) => {
          console.log("FETCH ERROR", error);
        });
    },
    openMemo() {
      const title = prompt("파일 제목을 입력하세요.");
      if (title) {
        axios
          .post("/api/memo/open", {
            userid: sessionStorage.getItem("userid"),
            title: title,
          })
          .then((response) => {
            const data = response.data;
            if (data.message == "파일 로딩 성공") {
              const newMemo = {
                title: title,
                content: data.data,
              };

              this.memos.push(newMemo);
              this.currentMemo = { ...newMemo };
              this.currentTabIndex = this.memos.length - 1;

              this.memos[this.currentTabIndex].isSaved = true;
              console.log(this.currentTabIndex);
            } else {
              this.errormsg = data.message;
              alert(this.errormsg);
            }
          })
          .catch((error) => {
            console.log("FETCH ERROR", error);
          });
      }
    },
    saveAsMemo() {
      const newTitle = prompt("파일 이름을 입력하세요:");

      if (newTitle === "") {
        alert("메모 제목을 입력하세요.");
        return;
      }

      if (newTitle !== null) {
        axios
          .post("/api/memo/saveAs", {
            title: newTitle,
            content: this.currentMemo.content,
            userid: sessionStorage.getItem("userid"),
          })
          .then((response) => {
            const data = response.data;
            if (data.message == "파일 저장 성공") {
              this.currentMemo.title = newTitle;
              this.memos[this.currentTabIndex] = { ...this.currentMemo };
              this.memos[this.currentTabIndex].isSaved = true;
            } else {
              this.errormsg = data.message;
              alert(this.errormsg);
            }
          })
          .catch((error) => {
            console.log("FETCH ERROR", error);
          });
      }
    },
    saveMemo() {
      const title = this.currentMemo.title;
      const content = this.currentMemo.content;
      axios
        .post("/api/memo/save", {
          title: title,
          content: content,
          userid: sessionStorage.getItem("userid"),
        })
        .then((response) => {
          const data = response.data;
          if (data.message == "파일 저장 성공") {
            this.currentMemo.isSaved = false;
          } else {
            this.errormsg = data.message;
            alert(this.errormsg);
          }
        })
        .catch((error) => {
          console.log("FETCH ERROR", error);
        });
    },
    logout() {
      const savedTabs = this.memos.filter((memo) => memo.isSaved);
      const activityMemoTitles = savedTabs.map((memo) => memo.title);
      axios
        .post("/api/users/logout", {
          userid: sessionStorage.getItem("userid"),
          activityMemoTitles: activityMemoTitles,
        })
        .then(() => {
          sessionStorage.removeItem(this.userid);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("FETCH ERROR", error);
        });
    },

    /*
    closeMemo(index) {
      if (index === this.currentTabIndex) {
        console.log(0)
        if (index > 0) {
          console.log(1)
          this.selectTab(index - 1);
          this.currentTabIndex=this.selectTab(index - 1);
        } else if (this.memos.length > 0) {
          console.log(2)
          this.selectTab(index+1);
          this.currentTabIndex=this.selectTab(index+1)
        } else {
          console.log(3)
          this.newMemo();
        }
        this.memos.splice(index, 1);
      } else if (index < this.currentTabIndex) {
        this.currentTabIndex--;
        this.memos.splice(index, 1);
      }else{
        this.memos.slice(index,1)
      }
    },
    */
  },
};
</script>
<style scoped src="../assets/style.css">
@import "../assets/style.css";
</style>
