<template>
    <div class="app-goods">
        <header class="goods-header">
            <span class="header-left" @click="$router.back(-1)">
                <i class="icon iconfont icon-fanhuijiantou"></i>
            </span>
            <span class="header-center"><i>{{shopName}}</i>所有商品</span>
            <span class="header-right">...</span>
            </header>
        <main class="goods-main">
            <div v-for="item in goodsData" :key="item.id" >
                <router-link :to="{ path: '/goodsDetail', query: {id: item.goods_id} }" class="main-item">
                <div class="item-left">
                    <img v-lazy="IMAGESURL + item.goods_img">
                </div>
                <div class="item-right">
                    <div class="right-top">{{item.goods_name}}</div>
                    <div class="right-middle">{{item.goods_desc}}</div>
                    <div class="right-bottom">{{item.goods_price}}</div>
                </div>
                </router-link>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data(){
        return{
            goodsData:'',
            shopName:""
        }
    },
    methods:{
         getGoodsData() {
            axios
                .get(this.URL + "goodsSelectByShopId/" + this.$route.query.id)
                .then(response => {
                    console.log(response.data.data);
                    this.goodsData = response.data.data;
                    this.shopName = response.data.data[0].shop_name;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created(){
        this.getGoodsData()
    }
}
</script>

<style lang="scss" scoped>
.app-goods{
    .goods-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 10px;
        border-bottom: 1px solid #ccc;
        .header-center{
            i{
                font-style: none;
                text-decoration: none;
                color: #ff0000;
            }
            
        }
    }
    .goods-main{
        .main-item{
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
            .item-left{
                width: 100px;
                flex: 0 0 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    width: 80%;
                    height: auto;
                }
            }
            .item-right{
                flex: 1;
                .right-top{
                    line-height: 30px;
                }
                .right-middle{
                    line-height: 30px;
                    color: #999;
                }
                .right-bottom{
                    color: #ff0000;
                }
            }
        }
    }
}
</style>


