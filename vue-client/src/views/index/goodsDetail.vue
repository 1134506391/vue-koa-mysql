<template>
    <div class="app-goods-detail">
        <header class="detail-header">
            <span class="header-left" @click="$router.back(-1)">
                <i class="icon iconfont icon-fanhuijiantou"></i>
            </span>
            <span class="header-center">商品详情</span>
            <span class="header-right">...</span>
        </header>
        
        <main class="detail-main">
            <div class="main-top">
                <img v-lazy="IMAGESURL + goodsDetailData.goods_img">
            </div>
            <div class="main-middle">
                <div class="middle-price">{{goodsDetailData.goods_price}}</div>
                <div class="middle-name">{{goodsDetailData.goods_name}}</div>
                <div class="middle-desc">{{goodsDetailData.goods_desc}}</div>
            </div>
            <div>
                <span>数量</span>
                <input type="number" v-model="goodsNumber">
            </div>
        </main>
        <footer class="detail-footer">
            <div class="footer-left"><router-link :to="{ path: '/goods', query: {id: goodsDetailData.shop_id} }">店铺</router-link></div>
            <div class="footer-center">我的购物车</div>
            <div class="footer-right" @click="addToCart">加入购物车</div>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsDetailData: "",
            goodsNumber: 1
        };
    },
    methods: {
        getGoodsDetailData() {
            axios
                .get(this.URL + "goodsSelectById/" + this.$route.query.id)
                .then(response => {
                    console.log(response.data.data);
                    this.goodsDetailData = response.data.data[0];
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // addToCart(){
        //     axios.post(this.URL + 'orderItemInsertInto',{
        //         goodsId:this.goodsDetailData.goods_id,
        //         goodsname:this.goodsDetailData.goods_name,
        //         goodsPrice:this.goodsDetailData.goods_price,
        //         goodsNumber:this.goodsNumber,
        //         userId:localStorage.getItem('userInfoId')
        //     })
        //         .then(response => {
        //             console.log(response)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        // }
        addToCart() {
            axios
                .post(this.URL + "cartInsertInto", {
                    goodsId: this.goodsDetailData.goods_id,
                    goodsNumber: this.goodsNumber,
                    userId: localStorage.getItem("userInfoId")
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created() {
        this.getGoodsDetailData();
    }
};
</script>

<style lang="scss" scoped>
.app-goods-detail {
    .detail-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 10px;
        border-bottom: 1px solid #ccc;
    }
    .detail-main {
        .main-top {
            width: 100%;
            height: 270px;
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;
            padding: 10px 0;
            img {
                display: block;
                width: 80%;
                height: 250px;
                margin: auto;
            }
        }
        .main-middle {
        }
    }
    .detail-footer {
        position: fixed;
        left: 0;
        bottom: 60px;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        border-top: 1px solid #ccc;
        div{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
        }
        .footer-center{
           
            background-color: yellow;
        }
        .footer-right {
            color: #fff;
            background-color: #ff0000;
        }
    }
}
</style>


