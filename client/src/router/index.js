import Vue from 'vue'
import Router from 'vue-router'
import Landing from '../views/Landing.vue'
import Intro from '../components/LandingPage/Intro.vue'
import SignIn from '../components/LandingPage/SignIn.vue'
import SignUp from '../components/LandingPage/SignUp.vue'
import AboutUs from '../components/LandingPage/AboutUs.vue'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import AccountDashboard from '../components/Account/AccountDashboard.vue'
import AccountProducts from '../components/Account/AccountProduct.vue'
import AccountSetting from '../components/Account/AccountSetting.vue'
import Search from '../views/Search.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/get-started',
            component: Landing,
            children: [
                {
                    path: '',
                    name: 'introduction',
                    component: Intro
                },
                {
                    path: '/login',
                    name: 'login',
                    component: SignIn
                },
                {
                    path: '/register',
                    name: 'register',
                    component: SignUp
                },
                {
                    path: '/about-us',
                    name: 'about-us',
                    component: AboutUs
                },
            ]
        },
        {
            path: '',
            name: 'homepage',
            component: Home
        },
        {
            path: '/account',
            component: Account,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: AccountDashboard
                },
                {
                    path: 'products',
                    name: 'account-products',
                    component: AccountProducts
                },

                {
                    path: 'setting',
                    name: 'account-setting',
                    component: AccountSetting
                }
            ]
        },
        {
            path: '/search/:query',
            name: 'search',
            component: Search
        },
        {
            path: '/product/:id',
            name: 'product-detail',
            component: ProductDetail
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,

        },
    ]    
})