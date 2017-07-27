/**
 * (c) Copyright 2017 Trade Street Inc.
 * created by waweru
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        sample: 'hello world'
    }
});

export default store;
