const routes = [
  // Main Layout
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'project',
        component: () => import('pages/project/ProjectOverviewPage.vue')
      },
      {
        path: 'project/editor',
        component: () => import('pages/project/ProjectEditorPage.vue')
      }
    ]
  },

  // Authentication Layout
  {
    path: '/auth',
    component: () => import('layouts/AuthenticationLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/auth/LoginPage.vue')
      },
      {
        path: 'register',
        component: () => import('pages/auth/RegisterAccountPage.vue')
      },
      {
        path: 'reset',
        component: () => import('pages/auth/ResetPasswordPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
