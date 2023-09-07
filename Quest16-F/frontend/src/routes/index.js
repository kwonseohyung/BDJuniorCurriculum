//import Vue from "vue";
//import Router from "vue-router";
import { createWebHistory, createRouter } from "vue-router";
import Index from "../components/MovieIndexPage";
import Show from "../components/MovieShowPage";
import Memo from "../components/MemoCom";
//Vue.use(Router);

// export const router = new Router({
//   mode: "history",
//   routes: [
//     {
//       path: "/",
//       name: "index",
//       component: Index,
//     },
//     {
//       path: "/:id",
//       name: "show",
//       component: Show,
//     },
//   ],
// });

const routes = [
  {
    path: "/",
    name: "memo",
    component: Memo,
  },
  {
    path: "/index",
    name: "index",
    component: Index,
  },
  {
    path: "/:id",
    name: "show",
    component: Show,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
