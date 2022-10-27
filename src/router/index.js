import CityViewVue from "@/views/CityView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView, meta: { title: "Home" } },
    {
      path: "/weather/:state/:city",
      name: "cityView",
      component: CityViewVue,
      meta: {
        title: "Weather",
      },
    },
  ],
});

export default router;
