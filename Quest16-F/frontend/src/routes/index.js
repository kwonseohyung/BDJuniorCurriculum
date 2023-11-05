import { createRouter, createWebHistory } from "vue-router";
import SignCom from "@/components/SignCom";
import NoteCom from "@/components/NoteCom";
import LoginCom from "@/components/LoginCom";
import MainCom from "@/components/MainCom"

const routes = [
  {
    path: "/memo",
    name: "NoteCom",
    component: NoteCom,
    // props: (route) => ({ noteData: JSON.parse(route.params.noteData) }),
  },

  {
    path: "/",
    name: "MainCom",
    component: MainCom,
  },
  {
    path: "/login",
    name: "LoginCom",
    component: LoginCom,
  },
  {
    path: "/sign",
    name: "SignCom",
    component: SignCom,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;