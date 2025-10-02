import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录',
            breadcrumb: 1,
        },
    },

    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/index.vue'),
        meta: {
            title: '首页',
            breadcrumb: 1,
        },
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue'),
        meta: {
            title: '404',
            breadcrumb: 1,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'any',
        redirect: '/404',
    },
    {
        path: '/set',
        name: '/set',
        component: () => import('@/views/template.vue'),
        meta: {
            title: '系统管理',
            breadcrumb: 1,
        },
        children: [
            {
                path: 'menu',
                name: '/set/menu',
                component: () => import('@/views/template.vue'),
                meta: {
                    title: '菜单管理',
                    breadcrumb: 2,
                },
                children: [
                    {
                        path: 'list',
                        name: '/set/menu/list',
                        component: () => import('@/views/set/menu/list.vue'),
                        meta: {
                            title: '菜单列表',
                            breadcrumb: 2,
                        },
                    },
                    {
                        path: 'push',
                        name: '/set/menu/push',
                        component: () => import('@/views/set/menu/push.vue'),
                        meta: {
                            title: '编辑菜单',
                            breadcrumb: 3,
                        },
                    },
                ],
            },
            {
                path: 'permission',
                name: '/set/permission',
                component: () => import('@/views/template.vue'),
                meta: {
                    title: '权限管理',
                    breadcrumb: 2,
                },
                children: [
                    {
                        path: 'list',
                        name: '/set/permission/list',
                        component: () => import('@/views/set/permission/list.vue'),
                        meta: {
                            title: '权限列表',
                            breadcrumb: 2,
                        },
                    },
                    {
                        path: 'push',
                        name: '/set/permission/push',
                        component: () => import('@/views/set/permission/push.vue'),
                        meta: {
                            title: '编辑权限',
                            breadcrumb: 3,
                        },
                    },
                ],
            },
            {
                path: 'role',
                name: '/set/role',
                component: () => import('@/views/template.vue'),
                meta: {
                    title: '角色管理',
                    breadcrumb: 2,
                },
                children: [
                    {
                        path: 'list',
                        name: '/set/role/list',
                        component: () => import('@/views/set/role/list.vue'),
                        meta: {
                            title: '角色列表',
                            breadcrumb: 2,
                        },
                    },
                    {
                        path: 'push',
                        name: '/set/role/push',
                        component: () => import('@/views/set/role/push.vue'),
                        meta: {
                            title: '编辑角色',
                            breadcrumb: 3,
                        },
                    },
                ],
            },
            {
                path: 'admin',
                name: '/set/admin',
                component: () => import('@/views/template.vue'),
                meta: {
                    title: '管理员',
                    breadcrumb: 2,
                },
                children: [
                    {
                        path: 'list',
                        name: '/set/admin/list',
                        component: () => import('@/views/set/admin/list.vue'),
                        meta: {
                            title: '管理员列表',
                            breadcrumb: 2,
                        },
                    },
                    {
                        path: 'push',
                        name: '/set/admin/push',
                        component: () => import('@/views/set/admin/push.vue'),
                        meta: {
                            title: '编辑管理员',
                            breadcrumb: 3,
                        },
                    },
                ],
            },
            {
                path: 'log',
                name: '/set/log',
                component: () => import('@/views/set/log.vue'),
                meta: {
                    title: '系统日志',
                    breadcrumb: 2,
                },
            },
        ],
    },
    {
        path: '/article',
        name: '/article',
        component: () => import('@/views/template.vue'),
        meta: {
            title: '文章管理',
            breadcrumb: 1,
        },
        children: [
            {
                path: 'article',
                name: '/article/article',
                component: () => import('@/views/template.vue'),
                meta: {
                    title: '文章管理',
                    breadcrumb: 2,
                },
                children: [
                    {
                        path: 'list',
                        name: '/article/article/list',
                        component: () => import('@/views/article/article/list.vue'),
                        meta: {
                            title: '文章列表',
                            breadcrumb: 2,
                        },
                    },
                    {
                        path: 'info',
                        name: '/article/article/info',
                        component: () => import('@/views/article/article/info.vue'),
                        meta: {
                            title: '文章详情',
                            breadcrumb: 3,
                        },
                    },
                ],
            },
            {
                path: 'category',
                name: '/article/category',
                component: () => import('@/views/template.vue'),
                meta: {
                    title: '分类管理',
                    breadcrumb: 2,
                },
                children: [
                    {
                        path: 'list',
                        name: '/article/category/list',
                        component: () => import('@/views/article/category/list.vue'),
                        meta: {
                            title: '分类列表',
                            breadcrumb: 2,
                        },
                    },
                    {
                        path: 'push',
                        name: '/article/category/push',
                        component: () => import('@/views/article/category/push.vue'),
                        meta: {
                            title: '编辑分类',
                            breadcrumb: 3,
                        },
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    //滚动行为
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        };
    },
});

export default router;
