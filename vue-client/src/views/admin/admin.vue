<template>
    <div class="app-admin">
        <header class="admin-header">
            <div class="header-left">
                <router-link to="/admin">
                    <img src="@/assets/logo.png" alt="img">
                    <span>vue+koa+mysql</span>
                </router-link>

            </div>
            <div>admin/轮播图管理/轮播图新增</div>
            <div class="header-right">
                <img v-lazy="IMAGESURL + this.$store.state.shopInfo.shop_img" alt="img">
                <span>{{this.$store.state.shopInfo.shop_name}}</span>
                <span @click="logout">退出</span>
            </div>
        </header>
        <main class="admin-main">
            <nav class="main-nav">
                <ul>
                    <li>
                        <a @click="menuClick" :class="{actived:menuActived}"><img src="@/assets/images/menu.png" alt="img">
                            <span>店铺管理</span><img src="@/assets/images/down.png" alt="img"></a>

                        <ul v-show="aa">
                            <li>
                                <a>销售信息</a>
                            </li>
                            <li>
                                <router-link to="/admin/shopInfo">
                                    店铺信息
                                </router-link>
                            </li>

                            <li>
                                <a>店铺编辑</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a class="actived"><img src="@/assets/images/menu.png" alt="img">
                            <span>商品管理</span><img src="@/assets/images/down.png" alt="img"></a>
                        <ul>
                            <li>
                                <router-link to="/admin/goodsInfo">
                                    商品信息
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/goodsAdd">
                                    商品新增
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/admin/goodsEdit">
                                    商品编辑
                                </router-link>
                            </li>
                            <li>
                                <a>商品删除</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a><img src="@/assets/images/menu.png" alt="img">
                            <span>订单管理</span><img src="@/assets/images/down.png" alt="img"></a>
                    </li>
                    <li>
                        <a>
                            <img src="@/assets/images/menu.png" alt="img">
                            <span>轮播图管理</span><img src="@/assets/images/down.png" alt="img">
                        </a>
                        <ul>
                            <li>
                                <a>轮播图信息</a>
                            </li>
                            <li>
                                <a>轮播图新增</a>
                            </li>
                            <li>
                                <a>轮播图编辑</a>
                            </li>
                            <li>
                                <a>轮播图删除</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a>
                            <img src="@/assets/images/menu.png" alt="img">
                            <span>商铺分类管理</span><img src="@/assets/images/down.png" alt="img">
                        </a>
                        <ul>
                            <li>
                                <a>商铺分类信息</a>
                            </li>
                            <li>
                                <a>商铺分类新增</a>
                            </li>
                            <li>
                                <a>商铺分类编辑</a>
                            </li>
                            <li>
                                <a>商铺分类删除</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a>
                            <img src="@/assets/images/menu.png" alt="img">
                            <span>权限管理</span><img src="@/assets/images/down.png" alt="img">
                        </a>
                    </li>
                    <li>
                        <a>
                            <img src="@/assets/images/menu.png" alt="img">
                            <span>日志管理</span><img src="@/assets/images/down.png" alt="img">
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="main-box">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            aa: false,
            menuActived: false,
            menuData: [
                {
                    id: 1,
                    name: "店铺管理",
                    check: false,
                    children: [
                        {
                            id: 1.1,
                            name: "销售情况",
                            check: false
                        },
                        {
                            id: 1.2,
                            name: "店铺修改",
                            check: false
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        menuClick() {
            this.aa = !this.aa;
        },
        logout() {
            sessionStorage.clear();
            // window.location.reload();
            this.$router.push({ path: "/adminLogin" });
        }
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
.app-admin {
    // padding-top:-60px;
    .admin-header {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 1001;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        padding: 0 20px;
        // padding-top:60px;
        color: #fff;
        background-color: #324157;
        img {
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }
        .header-left {
            a {
                display: flex;
                align-items: center;
                color: #fff;
                span {
                    color: #fff;
                }
            }
        }
        .header-right {
            display: flex;
            align-items: center;
            img {
                border-radius: 50%;
            }
        }
    }
    .admin-main {
        .main-nav {
            position: fixed;
            left: 0;
            top: 60px;
            bottom: 0;
            width: 220px;
            // height: 100%;
            background-color: #324157;
            overflow-x: hidden;
            overflow-y: scroll;
            > ul {
                cursor: pointer;
                a {
                    display: flex;
                    align-items: center;
                    height: 60px;
                    padding-left: 20px;
                    padding-right: 20px;
                    box-sizing: border-box;
                    border-top: 1px solid #1f2d3d;
                    color: #fff;
                    &.actived:hover {
                        img:last-child {
                            transform: rotate(180deg);
                        }
                    }
                    img {
                        width: 20px;
                        height: 20px;
                        &:first-child {
                            flex: 0 0 20px;
                            margin-right: 10px;
                        }
                        &:last-child {
                            flex: 0 0 20px;
                        }
                    }
                    span {
                        flex: 1;
                    }
                }
                > li {
                    > a {
                        &:hover {
                            // background-color: #1f2d3d;
                        }
                    }
                    > ul {
                        background-color: #1f2d3d;
                        > li {
                            display: flex;
                            align-items: center;
                            height: 50px;
                            padding-left: 30px;
                            box-sizing: border-box;
                            border-top: 1px solid #1f2d3d;
                            > a {
                                &:hover {
                                    color: #20a0ff;
                                }
                            }
                        }
                    }
                }
            }
        }
        .main-box {
            margin-left: 220px;
            padding: 0 20px;
            padding-top: 60px;
            .box-top {
                display: flex;
                align-items: center;
                height: 80px;
            }
        }
    }
}
</style>
