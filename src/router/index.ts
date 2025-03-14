import { createRouter, createWebHistory } from "vue-router";
import i18n from "@/plugins/i18n.ts";
import home from "../views/home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      meta: {
        title: "meta.home",
      },
    },

    //error-404
    {
      path: "/:catchAll(.*)",
      name: "error-404",
      component: () => import("@/views/error-404.vue"),
      meta: {
        title: "meta.page_not_found",
      },
    },
  ],

  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

router.afterEach((to) => {
  const titleKey = to.meta.title as string;
  document.title = i18n.global.t(titleKey);
});

export default router;
