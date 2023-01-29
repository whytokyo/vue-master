import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/layout'


export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
    },
    {
        path: '',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/home',
                component: () => import('@/components/HelloWorld.vue'),
            },
            {
                path: '/aside',
                component: () => import('@/layout/components/aside.vue'),
            },
            {
                path: '/header',
                component: () => import('@/layout/components/header.vue'),
            },
            {
                path: '/rate',
                component: () => import('@/views/rate.vue'),
            },
        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

export default router
