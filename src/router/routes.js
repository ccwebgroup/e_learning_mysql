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
        path: "/admin/common-users",
        name: "Common Users",
        component: () => import("pages/admin/CommonUsersPage.vue"),
      },
      {
        path: "/admin/users",
        name: "Manage Users",
        component: () => import("pages/admin/UsersPage.vue"),
      },
      {
        path: "/admin",
        component: () => import("pages/admin/LessonsPage.vue"),
      },
      {
        path: "/admin/exercises/:id",
        component: () => import("pages/admin/ExercisesPage.vue"),
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
      {
        path: "/exercises/:id",
        component: () => import("src/pages/ViewExercisesPage.vue"),
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
