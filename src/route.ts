import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'BaseIndex',
      component: () => import('@/views/BaseIndex.vue')
    },
    {
      path: '/auth',
      name: 'BaseAuth',
      component: () => import('@/views/BaseAuth.vue'),
      children: [
        {
          path: 'login',
          name: 'AuthLogin',
          component: () => import('@/views/auth/AuthLogin.vue')
        },
        {
            path: 'register',
            name: 'AuthRegister',
            component: () => import('@/views/auth/AuthRegister.vue')
        }
      ]
    }
  ]
})

export default router
