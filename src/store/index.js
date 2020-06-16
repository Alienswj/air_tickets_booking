import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentUser: JSON.parse(window.sessionStorage.getItem("user"))
    },
    mutations: {
        initCurrentUser(state, user) {
            state.currentUser = user;
        },
    },
    actions: {

    },
    getters: {

    },
    modules: {

    }
})

export default store;