import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/index/index/index'
    },
    {   // 平台列表
        path: '/index',
        component: () => import('@/components/Base.vue'),
        children: [
            {
                path: 'index',
                component: () => import('@/components/index/Base.vue'),
                children: [
                    { path: 'index', component: () => import('@/components/index/index/Index.vue'), },
                    { path: 'platform', component: () => import('@/components/index/platform/List.vue'), },
                ],
            },
            {
                path: 'passport',
                component: () => import('@/components/passport/Base.vue'),
                children: [
                    { path: 'login', component: () => import('@/components/passport/Login.vue'), },
                    { path: 'forget', component: () => import('@/components/passport/Forget.vue'), },
                    { path: 'newpassword', component: () => import('@/components/passport/NewPassword.vue'), },
                ],
            },
        ],
    },
    {   // 电气预警系统
        path: '/ew',
        component: () => import('@/components/Base.vue'),
        children: [
            {   // 看板页
                path: 'board',
                component: () => import('@/components/ew/Index.vue'),
            },
            {   // 首页
                path: 'index',
                component: () => import('@/components/ew/Base.vue'),
                children: [
                    { path: 'index', component: () => import('@/components/ew/index/Index.vue'), },
                ],
            },
            {   // 系统设置
                path: 'system',
                component: () => import('@/components/ew/Base.vue'),
                children: [
                    { path: 'access', component: () => import('@/components/ew/system/Access.vue'), },
                    { path: 'role', component: () => import('@/components/ew/system/Role.vue'), },
                ],
            },
            {   // 安监局管理
                path: 'sib',
                component: () => import('@/components/ew/Base.vue'),
                children: [
                    { path: 'list', component: () => import('@/components/ew/sib/List.vue'), },
                    { path: 'add', component: () => import('@/components/ew/sib/Add.vue'), },
                ],
            },
            {   // 检查管理
                path: 'inspect',
                component: () => import('@/components/ew/Base.vue'),
                children: [
                    { path: 'inspector', component: () => import('@/components/ew/inspect/Inspector.vue'), },
                    { path: 'report', component: () => import('@/components/ew/inspect/Report.vue'), },
                    { path: 'report_detail', component: () => import('@/components/ew/inspect/ReportDetail.vue'), },
                ],
            },
            {   // 统计报表
                path: 'statistical',
                component: () => import('@/components/ew/Base.vue'),
                children: [
                    { path: 'inspector', component: () => import('@/components/ew/statistical/Inspector.vue'), },
                    { path: 'abnormal', component: () => import('@/components/ew/statistical/Abnormal.vue'), },
                ],
            },
        ],
    },
    {   // 电气预警系统
        path: '/em',
        component: () => import('@/components/Base.vue'),
        children: [
            {   // 看板页
                path: 'board',
                component: () => import('@/components/em/Index.vue'),
            },
            {   // 首页
                path: 'index',
                component: () => import('@/components/em/Base.vue'),
                children: [
                    { path: 'index', component: () => import('@/components/em/index/Index.vue'), },
                ],
            },
            {   // 设备管理
                path: 'device',
                component: () => import('@/components/em/Base.vue'),
                children: [
                    { path: 'list', component: () => import('@/components/em/device/List.vue'), },
                    { path: 'shunting', component: () => import('@/components/em/device/Shunting.vue'), },
                ],
            },
            {   // 系统设置
                path: 'system',
                component: () => import('@/components/em/Base.vue'),
                children: [
                    { path: 'access', component: () => import('@/components/em/system/Access.vue'), },
                    { path: 'role', component: () => import('@/components/em/system/Role.vue'), },
                ],
            },
        ],
    },
];

const router = new VueRouter({
    mode: 'history',    /*hash模式改为history*/
    routes: routes,
})

export default router;

