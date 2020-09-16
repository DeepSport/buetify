import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Button from "../views/components/button/Button.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Button",
    component: Button
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
