import { createWebHistory, createRouter } from "vue-router";
import NoteCom from "../components/NoteCom";
import LoginCom from "../components/LoginCom";
import SignCom from "../components/SignCom";
import IndexCom from "../components/IndexCom";
import MemoCom from "../components/IndexCom";

const routes = [
  {
    path: "/",
    component: MemoCom,
  },
  {
    path: "/index",
    component: IndexCom,
  },
  {
    path: "/login",
    component: LoginCom,
  },
  {
    path: "/sign",
    component: SignCom,
  },
  {
    path: "/note",
    component: NoteCom,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
