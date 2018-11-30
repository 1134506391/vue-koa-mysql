<template>
    <div class="app-my">
        <header class="my-header">
            <span class="header-left" @click="$router.back(-1)">
                <i class="icon iconfont icon-fanhuijiantou"></i>
               
            </span>
            <span class="header-center">我的</span>
            <span @click="logout" class="header-right">退出</span>
        </header>
        <section class="my-top">
            <div class="top-left">
                <img v-lazy="IMAGESURL + this.$store.state.userInfo.user_img" alt="png">
             
            </div>
            <div class="top-right">
                <p>{{this.$store.state.userInfo.user_name}}</p>
                <p>会员</p>
            </div>
        </section>
        <section class="my-middle">
            <div class="middle-item">
                <i class="icon iconfont icon-tuikuan"></i>
                <p>待付款</p>
            </div>
            <div class="middle-item">
                <i class="icon iconfont icon-bujifapiao"></i>
                <p>待配送</p>
            </div>
            <div class="middle-item">
                <i class="icon iconfont icon-zhifu"></i>
                <p>待收货</p>
            </div>
            <div class="middle-item">
                <i class="icon iconfont icon-xiugaidingdan"></i>
                <p>待评论</p>
            </div>
        </section>
        <section class="my-bottom">
            <div class="bottom-item">
                <div class="item-left">
                    <i class="icon iconfont icon-dingdandaifukuan"></i>
                </div>
                <div class="item-center">
                    我的订单
                </div>
                <div class="item-right">
                    <i class="icon iconfont icon-jinrujiantou"></i>
                    
                </div>
            </div>
            <div class="bottom-item">
                <div class="item-left">
                    <i class="icon iconfont icon-dibiao"></i>
                    
                </div>
                <div class="item-center">
                    我的收货地址
                </div>
                <div class="item-right">
                    <i class="icon iconfont icon-jinrujiantou"></i>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods:{
        logout(){
            sessionStorage.removeItem('userInfo')
            window.location.reload();
        }
    }
};
</script>

<style lang="scss" scoped>
.app-my {
    height: 100%;
    background-color: #f5f5f5;
    .my-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 10px;
        border-bottom: 1px solid #ccc;
        background-color: #fff;
    }
    .my-top {
        height: 120px;
        display: flex;
        align-items: center;
        margin: 10px;
        border-radius: 8px;
        background-color: #ff0000;
        color: #fff;
        .top-left {
            flex: 0 0 60px;
            width: 60px;
            margin: 0 20px;
            img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
        }
        .top-right {
            flex: 1;
        }
    }
    .my-middle {
        display: flex;
        border-bottom: 1px solid #ccc;
        background-color: #fff;
        .middle-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 1;
            // padding: 10px 0;
            padding-bottom: 10px;
            font-size: 12px;
            i {
                font-size: 30px;
                margin-bottom: 5px;
            }
        }
    }
    .my-bottom {
        margin-top: 20px;
        .bottom-item {
            display: flex;
            align-items: center;
            width: 100%;
            height: 60px;
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;
            background-color: #fff;
            .item-left {
                flex: 0 0 50px;
                width: 50px;
                margin-left: 10px;
                i {
                    font-size: 30px;
                }
            }
            .item-center {
                flex: 1;
            }
            .item-right {
                flex: 0 0 50px;
                width: 50px;
            }
        }
    }
}
</style>


