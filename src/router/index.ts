import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/peoples",
    name: "peoples",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PeoplesView.vue"),
  },
  {
    path: "/peoples/:id",
    name: "character",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CharacterView.vue"),
  },
  {
    path: "/favourites",
    name: "favourites",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/FavouritesView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
