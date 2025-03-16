import { createRouter, createWebHistory } from "vue-router";
import i18n from "@/plugins/i18n.ts";
import tableView from "../views/table-view.vue";
import { useAuth } from "@/composables/useAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue"),
      meta: {
        title: "meta.login",
        hideNavbar: true,
        public: true,
      },
    },
    {
      path: "/table-view",
      name: "table-view",
      component: tableView,
      meta: {
        title: "meta.table_view",
        requiresAuth: true,
        allowedRoles: ["Admin", "Manager"],
      },
    },
    {
      path: "/add-new-user",
      name: "add-new-user",
      component: () => import("@/views/add-new-user.vue"),
      meta: {
        title: "meta.add_new_user",
        equiresAuth: true,
        allowedRoles: ["Admin", "Manager"],
      },
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: () => import("@/views/unauthorized.vue"),
      meta: {
        title: "meta.unauthorized",
        hideNavbar: true,
      },
    },

    //error-404
    {
      path: "/:catchAll(.*)",
      name: "error-404",
      component: () => import("@/views/error-404.vue"),
      meta: {
        title: "meta.page_not_found",
        hideNavbar: true,
        public: true,
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

router.beforeEach((to, from, next) => {
  const auth = useAuth();

  // Route requires authentication
  if (to.meta.requiresAuth && !auth.currentUser.value) {
    return next("/login");
  }

  // Check role-based permissions
  if (to.meta.allowedRoles) {
    const userRole = auth.currentUser.value?.role;
    if (!userRole || !(to.meta.allowedRoles as string[]).includes(userRole)) {
      return next("/unauthorized"); // Create this route
    }
  }

  next();
});

export default router;