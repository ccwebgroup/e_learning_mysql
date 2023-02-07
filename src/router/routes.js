const routes = [
  {
    path: '/admin',
    component: () => import("layouts/AdminLayout.vue"),
    meta: {
      // requiresAuth: true,
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

  {
    path: '/',
    redirect: '/index',
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("pages/IndexPage.vue"),
      },
    ]
  },

  // Educator Routes
  {
    path: "/educator",
    redirect: "/educator/records",
    meta: {
      requiresAuth: true,
      isEducator: true,
    },
    component: () => import("layouts/EducatorLayout.vue"),
    children: [
      // {
      //   path: "/educator/dashboard",
      //   component: () => import("pages/educator/DashboardPage.vue"),
      // },
      {
        path: "/educator/records",
        name: "Educator Records",
        component: () => import("pages/educator/RecordsPage.vue"),
      },
      {
        path: "/educator/account",
        component: () => import("src/pages/AccountPage.vue"),
      },
      {
        path: "/educator/assesments",
        component: () => import("pages/educator/AssesmentsPage.vue"),
      },
      {
        path: "/educator/assesment/:id",
        meta: { subPage: true },
        component: () => import("pages/educator/QuestionairePage.vue"),
      },
    ],
  },

  // Student Routes
  {
    path: "/student",
    redirect: "/student/records",
    meta: {
      requiresAuth: true,
      isStudent: true,
    },
    component: () => import("layouts/StudentLayout.vue"),
    children: [
      // {
      //   path: "/student/dashboard",
      //   component: () => import("pages/student/DashboardPage.vue"),
      // },
      {
        path: "/student/records",
        name: "Student Records",
        component: () => import("pages/student/RecordsPage.vue"),
      },
      {
        path: "/student/assesments",
        name: "Student Assesments",
        component: () => import("pages/student/AssesmentsPage.vue"),
      },
      {
        path: "/student/assesment/:id",
        meta: { subPage: true },
        component: () => import("pages/student/QuestionairePage.vue"),
      },
      {
        path: "/student/account",
        name: "Student Account",
        component: () => import("src/pages/AccountPage.vue"),
      },
    ],
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
