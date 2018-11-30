import Vue from 'vue'
import Router from 'vue-router'
//index
import HelloWorld from '@/components/HelloWorld'
import IndexParent from '@/views/index/indexParent'
import Index from '@/views/index/index'
import Category from '@/views/index/category'
import Cart from '@/views/index/cart'
import My from '@/views/index/my'
import Goods from '@/views/index/goods'
import Search from '@/views/index/search'
import GoodsDetail from '@/views/index/goodsDetail'
import UserLogin from '@/views/user/login'
import UserRegister from '@/views/user/register'

// admin
import Admin from '@/views/admin/admin'
import AdminHome from '@/views/admin/adminHome'

import AdminLogin from '@/views/admin/user/login'
import AdminRegister from '@/views/admin/user/register'
import Banner from '@/views/admin/banner'

import Shop from '@/views/admin/shop'
import AdminShopInfo from '@/views/admin/shop/shopInfo'

import AdminGoodsInfo from '@/views/admin/goods/goodsInfo'
import AdminGoodsAdd from '@/views/admin/goods/goodsAdd'
import AdminGoodsEdit from '@/views/admin/goods/goodsEdit'



Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'IndexParent',
            component: IndexParent,
            redirect: '/index',
            children: [{
                    path: '/index',
                    name: 'Index',
                    component: Index
                }, {
                    path: '/category',
                    name: 'Category',
                    component: Category
                },
                {
                    path: '/cart',
                    name: 'Cart',
                    component: Cart
                },
                {
                    path: '/my',
                    name: 'My',
                    component: My
                },
                {
                    path: '/goods',
                    name: 'Goods',
                    component: Goods
                },
                {
                    path: '/search',
                    name: 'Search',
                    component: Search
                },

                {
                    path: '/goodsDetail',
                    name: 'GoodsDetail',
                    component: GoodsDetail
                },
            ]
        },
        {
            path: '/login',
            name: 'UserLogin',
            component: UserLogin
        },
        {
            path: '/register',
            name: 'UserRegister',
            component: UserRegister
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin,
            redirect: '/admin/adminHome',
            children: [{
                    path: '/admin/adminHome',
                    name: 'AdminHome',
                    component: AdminHome,
                }, {
                    path: '/admin/banner',
                    name: 'Banner',
                    component: Banner,
                },
                {
                    path: 'shop',
                    name: 'Shop',
                    component: Shop,
                },
                {
                    path: '/admin/shopInfo',
                    name: 'AdminShopInfo',
                    component: AdminShopInfo,
                }, {
                    path: '/admin/goodsInfo',
                    name: 'AdminGoodsInfo',
                    component: AdminGoodsInfo,
                }, {
                    path: '/admin/goodsAdd',
                    name: 'AdminGoodsAdd',
                    component: AdminGoodsAdd,
                },
                {
                    path: '/admin/goodsEdit',
                    name: 'AdminGoodsEdit',
                    component: AdminGoodsEdit,
                },
            ]
        },
        {
            path: '/adminLogin',
            name: 'AdminLogin',
            component: AdminLogin,
        },
        {
            path: '/adminRegister',
            name: 'AdminRegister',
            component: AdminRegister,
        },
    ]
})