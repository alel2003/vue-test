import { createWebHistory, createRouter } from "vue-router";

import NotFound from "@/pages/not-found/index.vue";

const routes = [
  {
    path: "/phone/:slug",
    name: "PhoneSlugPage",
    component: () => import("@/pages/phone/index.vue"),
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
