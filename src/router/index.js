import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@v/Home/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/logs",
    name: "LogsList",
    component: () =>
      import(/* webpackChunkName: "LogsList" */ "@v/Logs/List.vue")
  },
  {
    path: "/history",
    name: "History",
    component: () => import(/* webpackChunkName: "History" */ "@v/History.vue")
  },
  {
    path: "/diary",
    name: "Diary",
    component: () =>
      import(/* webpackChunkName: "LogsDiary" */ "@v/LogsDiary.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
