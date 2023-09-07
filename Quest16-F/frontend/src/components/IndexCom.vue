<template>
  <body>
    <button class="clickBtn" onclick="location.href='/sign'">회원가입</button>
    <button class="clickBtn" onclick="location.href='/login'">로그인</button>
  </body>
</template>

<script>
//import axios from "axios";
export default {
  data() {
    return {
      id: "",
      password: "",
      Name: "",
    };
  },
  methods: {
    // submit() {
    //   this.$store
    //     .dispatch("store/login", {
    //       id: this.id,
    //       password: this.password,
    //       name: this.name,
    //     })
    //     .then(() => {
    //       if (this.$store.state.login2.errmsg) {
    //         this.errmsg = this.$store.state.login2.errmsg;
    //         this.id = this.password = "";
    //       }
    //     });
    // },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.clickBtn {
  margin: 3px;
}
</style>
