<template>
  <div>
    <h3>회원 가입</h3>
    <div class="input_row">
      <label for="id">아이디</label>
      <input type="text" id="id" v-model="userid" />
    </div>
    <div class="input_row">
      <label for="password">비밀번호</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <div class="input_row">
      <label for="name">이름</label>
      <input type="text" id="name" v-model="name" />
    </div>
    <button onclick="location.href='/'">홈</button>
    <button @click="signUp">확인</button>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  data: function () {
    return {
      userid: "",
      name: "",
      password: "",
      errormsg: "",
    };
  },
  methods: {
    signUp() {
      const userData = {
        userid: this.userid,
        password: this.password,
        name: this.name,
      };

      this.$store
        .dispatch("user/sign", userData)
        .then((data) => {
          if (data && data.message === "회원가입 성공") {
            this.$router.push({ name: "MainCom" });
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.log("FETCH ERROR", error);
        });
    },
  },

  // methods: {
  //   signUp: function () {
  //     const userData = {
  //       userid: this.userid,
  //       password: this.password,
  //       name: this.name,
  //     };
  //     if(this.userid=="" || this.password==""){
  //       this.errormsg="입력해주세요."
  //       alert(this.errormsg);
  //       return
  //     }
  //     axios
  //       .post('/api/users/sign', userData)
  //       .then((response) => {
  //         const data=response.data;
  //         if(data.message=="회원가입 성공"){
  //           this.$router.push("/");
  //         }else{
  //           this.errormsg=data.message;
  //           alert(this.errormsg);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("FETCH ERROR", error);
  //       });
  //   }
  // }
};
</script>

<style></style>
