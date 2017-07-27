/**
 * (c) Copyright 2017 Trade Street Inc.
 * created by waweru
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Welcome = () => import('./pages/welcome.vue');

export const router = new VueRouter({
    mode: 'history',
    fallback: true,
    linkActiveClass: 'link-active',
    linkExactActiveClass: 'exact-active',
    routes: [{
        path: '/',
        component: Welcome
    }]
});
