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
          :value="currentMemo.content"
          @input="updateContent"
          placeholder="메모 내용"
        ></textarea>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex"; // Vuex 연결을 위한 라이브러리 추가

export default {
  async created() {
    try {
      // 비동기 작업을 통해 데이터 로딩
      await this.$store.dispatch("fetchMemos");

      // 데이터가 로드된 후에 memos 출력
      console.log("memos:", this.$store.state.memos);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  },
  computed: {
    ...mapState({
      memos: (state) => state.memos,
      currentMemo: (state) => state.currentMemo,
      currentTabIndex: (state) => state.currentTabIndex,
    }),
  },
  methods: {
    ...mapActions([
      "newMemo",
      "openMemo",
      "saveAsMemo",
      "saveMemo",
      "deleteMemo",
      "logout",
      "indicate",
      "selectTab",
      "closeMemo",
    ]),
    updateContent(event) {
      this.currentMemo.content = event.target.value;
    },
  },
};
</script>

<style scoped src="../assets/style.css">
@import "../assets/style.css";
</style>
