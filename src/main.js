// @ts-nocheck
/**
 * (c) Copyright 2017 Trade Street Inc.
 * created by waweru
 */

import 'polyfill';
import './scss/main.scss';

import Vue from 'vue';
import {router} from './router';
import store from './vuex';
import App from './App.vue';

Vue.config.productionTip = (process.env.NODE_ENV!=='production');

new Vue({
  el: '#tstreet',
  render: h => h(App),
  router,
  store
})
