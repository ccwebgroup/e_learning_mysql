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
      {
        path: "/admin/lessons",
        name: "lessons",
        component: () => import("pages/admin/LessonsPage.vue"),
      },
    ]
  },

  // Authentication Routes
  {
    path: "/auth",
    redirect: "/auth/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/auth/login",
        name: "Login",
        component: () => import("pages/auth/LoginPage.vue"),
      },
    ],
  },

  // Main Routes
  {
    path: '/',
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/lessons/:id",
        component: () => import("src/pages/ViewLessonPage.vue"),
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
