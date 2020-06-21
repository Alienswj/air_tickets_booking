import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './components/Register.vue'
import Login from './views/Login.vue'
import MainPage from './views/MainPage.vue'
import OrderInfo from './components/OrderInfo.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '',
                    name: "MainPage",
                    component: MainPage
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register,
                }, {
                    path: 'login',
                    name: 'Login',
                    component: Login,
                }, {
                    path: 'OrderInfo',
                    name: 'OrderInfo',
                    component: OrderInfo,
                }
            ]
        }, {
            path: '/home',
            name: 'Home',
            component: Home,
        },
    ]
})