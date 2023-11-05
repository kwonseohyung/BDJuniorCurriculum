import { createApp } from "vue";
import router from "./routes/index";
import { store } from "./store/store";
import axios from "axios";
import App from "./App.vue";
import gloablVer from "./gloablVer";

const app = createApp(App);

// Vue Router 등록
app.use(router); // routes를 사용합니다.

// Vuex 스토어 등록
app.use(store);
app.use(gloablVer);
// Axios 설정
app.config.globalProperties.$axios = axios;

// 앱 마운트
app.mount("#app");

// import { createApp } from "vue";
// import store from "./store/store";
// import App from "./App.vue";
// import router from "./routes/index.js";
// import axios from "axios";

// const app = createApp(App);

// // Vuex 스토어 등록
// app.use(store);

// // 라우터 등록
// app.use(router);

// // Axios 설정
// app.config.globalProperties.$axios = axios;

// // 마운트
// app.mount("#app");
// import { createApp } from "vue";
// import App from "./App.vue";
// import store from "./store/store";
// import router from "./routes/index.js";
// import axios from "axios";

// createApp(App)
//   .use(router)
//   .use(store) // store 등록
//   .mount("#app");

// createApp(App).config.globalProperties.$axios = axios;
// import Vue from "vue";
// import App from "./App.vue";
// import router from "./routes";
// //import store from "./store/store";
// import axios from "axios";

// new Vue({
//   router,

//   axios,
//   render: (h) => h(App),
// }).$mount("#app");
