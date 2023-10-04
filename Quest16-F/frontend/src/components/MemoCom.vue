<template>
  <div class="content">
    <section class="section">
      <button class="mainButton" @click="newFile">새 파일</button>
      <button class="mainButton" @click="load">열기</button>
      <button class="mainButton" @click="save">저장</button>
      <button class="mainButton" @click="saveAs">저장(NEW)</button>
    </section>
    <main class="tab_menu">
      <ul class="list" id="ulId">
        <li v-for="(a, i) in tabList" :key="i">
          <p>{{ tabList[i] }}</p>
          <input type="button" value="X" class="btn" />
        </li>
      </ul>
      <textarea></textarea>
    </main>
  </div>
</template>

<script>
//import { Notepad } from "../assets/notepad";

//import "../assets/style.css";
export default {
  //name: "IndexCom",
  data() {
    return {
      fileName: "",
      tabList: [],
      contents: "",
    };
  },
  methods: {
    newFile() {
      this.tabList++;
    },
    load() {
      this.fileName = prompt("파일명을 입력하세요");
    },
    save() {},
    saveAs() {
      this.fileName = prompt("저장파일명을 입력하세요");
    },
  },
  // created() {
  //   this.initializeNotepad();
  // },
  props: {},
};
</script>

<style>
@import url(../assets/style.css);
</style>
