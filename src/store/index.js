import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentUser: JSON.parse(window.sessionStorage.getItem("user")),
        searchResult: null,
        queryCondition: null,
    },
    mutations: {
        initCurrentUser(state, user) {
            state.currentUser = user;
        },
        initSearchResult(state, result) {
            state.searchResult = result;
        },
        initQueryCondition(state, condition) {
            state.queryCondition = condition;
        }
    },
    actions: {

    },
    getters: {

    },
    modules: {

    }
})

export default store;