<template>
    <div class="app-search">
        <header class="search-header">
            <span class="header-left" @click="$router.back(-1)">
                <i class="icon iconfont icon-fanhuijiantou"></i>
            </span>
            <span class="header-center"><input v-model="idName" type="search" placeholder="搜索"></span>
            <span @click="searchBtn" class="header-right">确定</span>
        </header>
        <main class="search-main">
            <div v-for="(item,index) in goodsData" :key="item.id">
                <router-link :to="{path:'/goodsDetail',query:{id:item.goods_id}}" class="main-item">
                    <div class="item-left">
                        <img v-lazy="IMAGESURL + item.goods_img" alt="img">
                    </div>
                    <div class="item-right">
                        <p class="right-name">{{item.goods_name}}</p>
                        <p class="right-desc">{{item.goods_desc}}</p>
                        <p class="right-price">
                            <span class="price-left">¥{{item.goods_price}}</span>
                            <span class="price-right">销量
                                <i> {{item.goods_priority}} </i>件</span>
                        </p>

                    </div>
                </router-link>

            </div>

        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsData: [],
            idName:""

        };
    },
    methods: {
        getGoodsData() {
            axios
                .get(this.URL + "goodsSearchByIdOrName",{
                    params:{
                        idName:this.idName,
                        // a:"aa"
                    }
                })
                .then(response => {
                    console.log(response.data.data);
                    this.goodsData = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        searchBtn(){
            this.getGoodsData();
        }
    },
    created() {
        
    }
};
</script>
<style lang="scss">
.app-search {
    padding-top: 50px;
    padding-bottom: 60px;
    .search-header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1001;
        display: flex;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #ccc;
        .header-left {
            width: 50px;
            flex: 0 0 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 30px;
                height: 30px;
            }
        }
        .header-center {
            flex: 1;
            display: flex;
            align-items: center;
            input {
                width: 100%;
                height: 35px;
                border-radius: 20px;
            }
        }
        .header-right {
            width: 50px;
            flex: 0 0 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .search-main {
        h2 {
            font-weight: 400;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #ccc;
            color: #ff0000;
            i {
                position: relative;
                bottom: 2px;
                margin: 4px;
                font-size: 20px;
            }
        }
        .main-item {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
            .item-left {
                width: 100px;
                flex: 0 0 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                    width: 80%;
                    height: auto;
                }
            }
            .item-right {
                flex: 1;
                .right-name {
                    line-height: 30px;
                }
                .right-desc {
                    line-height: 30px;
                    color: #999;
                }
                .right-price {
                    display: flex;
                    color: #999;
                    .price-left {
                        margin-right: 20px;
                        color: #ff0000;
                    }
                    .price-right {
                        i {
                            color: #ff0000;
                        }
                    }
                }
            }
        }
    }
}
</style>
