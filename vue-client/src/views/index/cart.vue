<template>
    <div class="app-cart">
        <header class="cart-header">
            <span class="header-left" @click="$router.back(-1)">
                <i class="icon iconfont icon-fanhuijiantou"></i>
            </span>
            <span class="header-center">购物车</span>
            <span class="header-right">...</span>
        </header>
        <main class="cart-main">
            <div v-for="item1 in cartData" :key="item1.id" class="main-item">
                <div class="item-top">
                    <input type="checkbox" v-model="item1.checked" @change="selectItem1(item1)">
                    <span>{{item1.shop_name}}</span>
                </div>
                <div class="item-middle">
                    <div v-for="(item2,index2) in item1.goodsList" :key="item2.id" class="middle-list">
                        <div class="list-left">
                            <input type="checkbox" @change="selectItem2(item1)" v-model="item2.checked">
                        </div>
                        <div class="list-center">
                            <img v-lazy="IMAGESURL + item2.goods_img">
                        </div>
                        <div class="list-right">
                            <p>{{item2.goods_name}}</p>
                            <div>
                                <span>单价:{{item2.goods_price}}</span>
                                <span>数量:{{item2.cart_goods_number}}</span>
                            </div>
                            <p>总价:{{item2.goods_price*item2.cart_goods_number}}</p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
        <footer class="cart-footer">
            <div class="footer-left">
                <input type="checkbox" v-model="checkAll" @change="selectAll">
                <span>全选</span>
            </div>
            <div class="footer-center">
                合计:{{allPrice2}}
            </div>
            <div @click="submit" class="footer-right">
                结算
            </div>
        </footer>

    </div>
</template>

<script>
export default {
    data() {
        return {
            cc: 0,
            cartData: [],
            allPrice: 0,
            checkAll: false,
            dd: 0,
            arr1: []
        };
    },
    computed: {
        allPrice2() {
            let allPrice2Number = 0;
            let checkArr = [];

            this.cartData.forEach(item1 => {
                checkArr = [
                    ...checkArr,
                    ...item1.goodsList.filter(item2 => {
                        return item2.checked;
                    })
                ];
            }); //这里的遍历，你没有把每次遍历的值累加，所以造成了checkArr这个数组只会记录最后一次的遍历结果。
            checkArr.forEach(item => {
                allPrice2Number += item.cart_goods_number * item.goods_price;
            });
            return allPrice2Number;
        }
    },
    methods: {
        // 全选
        selectAll() {
            this.cartData.forEach(item => {
                item.checked = this.checkAll;
                item.goodsList.forEach(item => {
                    item.checked = this.checkAll;
                });
            });
            if (this.checkAll == false) {
                this.allPrice = 0;
            }
        },
        // 第一层选择
        selectItem1(item1) {
            item1.goodsList.forEach(i => {
                i.checked = item1.checked;
            });

            let lengths = this.cartData.length;
            let checkeds = this.cartData.filter(i => {
                return i.checked == true;
            }).length;

            if (lengths == checkeds) {
                this.checkAll = true;
            } else {
                this.checkAll = false;
            }
        },
        // 第二层选择
        selectItem2(item1) {
            let item1Price = 0;
            let lengths = item1.goodsList.length;
            let checkeds = item1.goodsList.filter(i => {
                return i.checked == true;
            });
            if (lengths == checkeds.length) {
                item1.checked = true;
            } else {
                item1.checked = false;
            }
            // checkeds.forEach(item => {
            //     this.allPrice += item.goods_price * item.cart_goods_number;
            // });
        },
        // 请求数据
        getcartData() {
            let userInfo = sessionStorage.getItem("userInfo");
            let userId = JSON.parse(userInfo).user_id;
            axios
                .get(this.URL + "cartSelectGroupByUserId/" + userId)
                .then(response => {
                    console.log(response.data.data);
                    this.cartData = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        submit() {
            // let data = {};
            let arr = [];
            this.cartData.forEach(item1 => {
                if (item1.checked == true) {
                    item1.goodsList.forEach(item2 => {
                        arr.push({"shopId":item1.shop_id,"goodsData":item2});
                    });
                } else {
                    item1.goodsList.forEach(item2 => {
                        if (item2.checked == true) {
                            arr.push({"shopId":item1.shop_id,"goodsData":item2});
                        }
                    });
                }
            });
            // arr.push({"userId":this.$store.state.userInfo.user_id},{"orderPrice":this.allPrice2})
            // data.userId = this.$store.state.userInfo.user_id;
            // data.orderPrice = this.allPrice2;

            axios
                .post(this.URL + "cartToOrder",{
                    data:arr,
                    userId:this.$store.state.userInfo.user_id,
                    orderPrice:this.allPrice2
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
        this.getcartData();
    }
};
</script>

<style lang="scss" scoped>
.app-cart {
    padding-bottom: 100px;
    background-color: #f5f5f5;
    .cart-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 10px;
        border-bottom: 1px solid #ccc;
        background-color: #fff;
    }
    .cart-main {
        .main-item {
            margin-bottom: 10px;
            background-color: #fff;
            box-sizing: border-box;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            .item-top {
                display: flex;
                align-items: center;
                height: 40px;
                box-sizing: border-box;
                border-bottom: 1px solid #ccc;
                input {
                    margin: 0 20px;
                }
                span {
                    flex: 1;
                }
            }
            .item-middle {
                .middle-list {
                    display: flex;
                    box-sizing: border-box;
                    border-bottom: 1px solid #ccc;
                    .list-left {
                        flex: 0 0 50px;
                        width: 50px;
                        text-align: center;
                    }
                    .list-center {
                        flex: 0 0 100px;
                        width: 100px;
                        img {
                            width: 80px;
                            height: 80px;
                        }
                    }
                    .list-right {
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                    }
                }
            }
            .item-footer {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 40px;
                border-top: 1px solid #ccc;
            }
        }
    }
    .cart-footer {
        position: fixed;
        left: 0;
        bottom: 60px;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        background-color: #fff;
        box-sizing: border-box;
        border-top: 1px solid #ccc;
        .footer-left {
            flex: 0 0 100px;
            width: 100px;
            display: flex;
            align-items: center;
            margin-left: 20px;
            input {
                margin-right: 20px;
            }
        }
        .footer-center {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            text-align: right;
            background-color: yellow;
        }
        .footer-right {
            flex: 0 0 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 50px;
            background-color: #ff0000;
            color: #fff;
        }
    }
}
</style>


