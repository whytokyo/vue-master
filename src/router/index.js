import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '@/layout'
import {Session} from "../utils/storage.js";


export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
    },
    {
        path: '/',
        component: Layout,
        // redirect: '/login',
        hidden: true,
        children: [
            {
                path: '/home',
                component: () => import('@/views/home.vue'),
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
            {
                path: '/user',
                component: () => import('@/views/system/user.vue'),
            },
        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        return next();
    }
    //获取token
    const token = Session.get('token')
    if (!token) {
        return next('/login')
    }
    next()
})


export default router
