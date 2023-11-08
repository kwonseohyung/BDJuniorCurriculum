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
          placeholder="메모 내용"
        ></textarea>
        <!-- <textarea
          v-model="currentMemo.content"
          @keypress="indicate()"
          placeholder="메모 내용"
        ></textarea> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("memo", ["memos", "currentMemo", "currentTabIndex"]),
  },
  methods: {
    ...mapActions("memo", [
      "newMemo",
      "openMemo",
      "saveAsMemo",
      "saveMemo",
      "deleteMemo",
      "logout",
      // "indicate",
      "selectTab",
      "closeMemo",
    ]),
  },
};
</script>

<style>
@import "../assets/style.css";
</style>
