import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';
import { Login, Region, User, Home } from '@/pages';

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/user', component: User },
        { path: '/region', component: Region },
    ]
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/login';
    }
});