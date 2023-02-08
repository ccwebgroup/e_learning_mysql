const routes = [
  {
    path: '/admin',
    component: () => import("layouts/AdminLayout.vue"),
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
    children: [
      {
        path: "/admin",
        name: "Users",
        component: () => import("pages/admin/UsersPage.vue"),
      },
    ]
  },

  // Authentication Routes
  {
    path: "/auth",
    redirect: "/auth/login",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "/auth/register",
        name: "Registration",
        component: () => import("pages/auth/RegisterPage.vue"),
      },
      {
        path: "/auth/login",
        name: "Login",
        component: () => import("pages/auth/LoginPage.vue"),
      },
    ],
  },

  {
    path: '/',
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;