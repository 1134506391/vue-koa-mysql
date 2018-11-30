// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/user'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false


// Vue.prototype.URL = 'http://www.pengrongjie.top'
// Vue.prototype.IMAGESURL = 'http://www.pengrongjie.top/images/'

Vue.prototype.URL = 'http://localhost:3000/'
Vue.prototype.IMAGESURL = 'http://localhost:3000/images/'



Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '../static/404.png',
    loading: '../static/readyLoading.png',
    attempt: 1
})



// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function(config) {
    var loading = document.getElementById("loading");
    // 在发送请求之前做些什么
    loading.style.display = "block"
    return config;
}, function(error) {
    // 对请求错误做些什么
    console.log("请求失败")
    return Promise.reject(error);
});
// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function(response) {
    var loading = document.getElementById("loading");
    // 处理响应数据
    loading.style.display = "none"
    return response;
}, function(error) {
    // 处理响应失败
    loading.style.display = "none"
    return Promise.reject(error);
});


if (sessionStorage.userInfo) {
    store.commit('setUserInfo', JSON.parse(sessionStorage.userInfo))
}

if (sessionStorage.shopInfo) {
    store.commit('setShopInfo', JSON.parse(sessionStorage.shopInfo))
}

router.beforeEach((to, from, next) => {
    if (sessionStorage.userInfo) {
        // if (store.state.userInfo.user_id == 1) { //如果有sessionStorage就畅通无阻
        next();
    } else if (sessionStorage.shopInfo) {
        next();
    } else {
        if (to.path == '/' || to.path == '/index' || to.path == '/login' || to.path == '/register' || to.path == '/adminLogin' || to.path == '/adminRegister') { //如果是首页直接next()
            next();
        } else { //不然就跳转到登录；
            next('/login');
        }
    }
});


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})