import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const userStore = new Vuex.Store({
    state: {
        userInfo: {},
        shopInfo: {}
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        setShopInfo(state, shopInfo) {
            state.shopInfo = shopInfo
        }
    },
    actions: {
        setUserInfo({ commit }, user) {
            commit('setUserInfo', user)
        },
        setShopInfo({ commit }, shop) {
            commit('setShopInfo', shop)
        }
    }
})
export default userStore