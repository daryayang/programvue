import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '热点新闻',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/user.vue'),
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    },
    {
        path: '/404',
        name: '404',
        meta: {
            title: '无法访问',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/404.vue'),
    },  {
        path: '/tabs',
        name: 'tabs',
        meta: {
            title: '系统通知',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/tabs.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果无法访问，进入404
        next('/404');
    } else {
        next();
    }
});

export default router;
