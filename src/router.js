import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './components/Register.vue'
import Login from './views/Login.vue'
import MainPage from './views/MainPage.vue'
import OrderInfo from './components/OrderInfo.vue'
import Manage from './views/Manage.vue'
import FlightInfo from './components/FlightInfo.vue'
import UserInfo from './components/UserInfo.vue'
import ManageFlight from './components/ManageFlight.vue'
import Revenue from './components/Revenue.vue'
import FlightOverview from './components/FlightOverview.vue'

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
                }, {
                    path: 'manage',
                    name: 'Manage',
                    component: Manage,
                    children: [
                        {
                            path: "flightinfo",
                            name: 'FlightInfo',
                            component: FlightInfo
                        }, {
                            path: "userinfo",
                            name: 'UserInfo',
                            component: UserInfo
                        }, {
                            path: "manageflight",
                            name: "ManageFlight",
                            component: ManageFlight
                        }, {
                            path: "revenue",
                            name: "Revenue",
                            component: Revenue
                        }, {
                            path: "flightoverview",
                            name: "FlightOverview",
                            component: FlightOverview
                        }
                    ]
                }
            ]
        }, {
            path: '/home',
            name: 'Home',
            component: Home,
        },
    ]
})