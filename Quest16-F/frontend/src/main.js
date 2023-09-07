import { createApp } from "vue";
import App from "./App.vue";
import router from "../src/routes/index";
import store from "./store/index";
import axios from "axios";

//createApp.config.globalProperties.$axios = axios;
//createApp(App).use(store).use(router).mount("#app");

const app = createApp(App);

// Axios를 Vue 앱에 등록
app.config.globalProperties.$axios = axios;

// Vue Router 및 Vuex 등의 플러그인을 사용할 경우 use()를 통해 등록
app.use(store);
app.use(router);

app.mount("#app");

