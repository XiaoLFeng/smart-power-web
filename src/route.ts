import {createRouter, createWebHistory} from 'vue-router'

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
        },
        {
            path: '/home',
            name: 'BaseDashboard',
            component: () => import('@/views/BaseDashboard.vue'),
            children: [
                {
                    path: 'dashboard',
                    name: 'DashHome',
                    component: () => import('@/views/dashboard/DashHome.vue')
                },
                {
                    path: 'electricity',
                    name: 'DashElectricity',
                    component: () => import('@/views/dashboard/DashElectricity.vue')
                },
                {
                    path: 'price',
                    name: 'DashPrice',
                    component: () => import('@/views/dashboard/DashPrice.vue')
                },
                {
                    path: 'account',
                    name: 'DashAccount',
                    component: () => import('@/views/dashboard/DashAccount.vue')
                }
            ]
        }
    ]
})

export default router
