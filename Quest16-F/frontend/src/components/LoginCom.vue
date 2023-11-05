<template>
  <div>
    <h3>로그인</h3>
    <div class="input_row">
      <label for="id">아이디</label>
      <input type="text" id="id" v-model="userid" />
    </div>
    <div class="input_row">
      <label for="password">비밀번호</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <button onclick="location.href='/'">홈</button>
    <button @click="login">확인</button>
    <button @click="login2">확인2</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: "",
      password: "",
      errormsg: "",
    };
  },

  methods: {
    login() {
      const userData = {
        userid: this.userid,
        password: this.password,
      };
      this.$store
        .dispatch("user/login", userData)
        .then((data) => {
          console.log(0);
          if (data && data.message === "로그인 성공") {
            console.log(1);
            console.log(data.data);
            this.$router.push({
              name: "NoteCom",
              state: { noteData: JSON.stringify(data.data) },
            });
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.log("FETCH ERROR", error);
        });
    },
  },
};
</script>
