<template>
    <div class="app-index-parent">
        <router-view></router-view>
        <ul>
            <li>
                <router-link to="/index">
                <i class="icon iconfont icon-fangzi"></i>
                    <p>首页</p>
                    
                </router-link>
            </li>
            <li>
                <router-link to="/category">
                <i class="icon iconfont icon-toutiao"></i>
                    <p>分类</p>
                    
                </router-link>
            </li>
            <li>
                <router-link to="/cart">
                <i class="icon iconfont icon-gouwuche"></i>
                    <p>购物车</p>
                    
                </router-link>

            </li>
            <li>
                <router-link to="/my">
                <i class="icon iconfont icon-wode"></i>
                    <p>我的</p>
                    
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
.app-index-parent {
    ul {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 1000;
        display: flex;
        width: 100%;
        height: 60px;
        background-color: #fff;
        box-sizing: border-box;
        border-top: 1px solid #ccc;
        li {
            flex: 1;
            a {
                text-decoration: none;
                display: flex;
                flex-direction: column;
                // justify-content: space-between;
                align-items: center;
                &.router-link-exact-active {
                    color: #ff0000;
                }
                p{
                    position: relative;
                    bottom:5px;
                }
                i {
                    position: relative;
                    bottom:5px;
                    font-size: 30px;
                }
            }
        }
    }
}
</style>


