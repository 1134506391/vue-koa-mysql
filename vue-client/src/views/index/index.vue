<template>
    <div class="app-index">
        <header class="index-header">
            <div class="header-left">
                <img src="@/assets/logo.png" alt="Image">
            </div>
            <div class="header-center">
                <router-link to="/search">
                    <input type="search" placeholder="搜索">
                </router-link>

            </div>


        </header>
        <div class="index-banner">
            <div class="banner-box" v-on:mouseover="stopPlay()" v-on:mouseout="startPlay()">
                <img v-for="(item,index) in bannerData" v-show="index === mark" :key="index" :src="item" alt="img" class="box-img">
                <div class="box-dot">
                    <span v-for="(item,index) in bannerData" @click="changeMark(index)" :class="{actived:index === mark}" :key="item.id" class="dot-item">{{index+1}}</span>
                </div>
            </div>
        </div>
        <nav class="index-nav">
            <div v-for="item in goodsCategroyData" :key="item.id" class="nav-item">
                <!-- <div class="nav-item"> -->
                <!-- <img class="item-img"  :src="IMAGESURL + item.goods_category_img" alt="img"> -->
                <img class="item-img" v-lazy="IMAGESURL + item.goods_category_img" alt="img">

                <p class="item-text">{{item.goods_category_name}}</p>
            </div>
        </nav>
        <main class="index-main">
            <h2>
                <i class="icon iconfont icon-huiyuan"></i>
                <span>热销榜</span>
            </h2>
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
            goodsCategroyData: "",
            goodsData: "",
            timer: null,
            mark: 0,
            bannerData: [
                "../../static/img1.jpg",
                "../../static/img2.jpg",
                "../../static/img3.jpg",
                "../../static/img4.jpg"
            ]
        };
    },
    methods: {
        getGoodsCategroyData() {
            axios
                .get(this.URL + "goodsCategorySelect")
                .then(response => {
                    // console.log(response);
                    this.goodsCategroyData = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getGoodsData() {
            axios
                .get(this.URL + "goodsSelect")
                .then(response => {
                    console.log(response);
                    this.goodsData = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        play() {
            this.mark++;
            if (this.mark === 4) {
                this.mark = 0;
            }
        },
        autoPlay() {
            this.timer = setInterval(this.play, 2000);
        },
        changeMark(index) {
            this.mark = index;
        },
        stopPlay() {
            clearInterval(this.timer);
        },
        startPlay() {
            this.timer = setInterval(this.play, 2000);
        }
    },
    created() {
        this.getGoodsCategroyData();
        this.getGoodsData();
        this.autoPlay();
    }
};
</script>

<style lang="scss">
.app-index {
    padding-top: 50px;
    padding-bottom: 60px;
    .index-header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1001;
        display: flex;
        width: 100%;
        height: 50px;
        background-color: #ff0000;
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
            margin-right: 10px;
            a{
                width: 100%;
                input {
                width: 100%;
                height: 35px;
                border-radius: 20px;
            }
            }
            
        }
    }
    .index-banner {
        .banner-box {
            width: 100%;
            position: relative;
            .box-img {
                width: 100%;
                height: auto;
            }
            .box-dot {
                width: 100%;
                position: absolute;
                bottom: 10px;
                left: 0;
                right: 0;
                text-align: center;
                z-index: 1000;
                .dot-item {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    margin: 0 5px;
                    background-color: #fff;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 20px;
                    &.actived {
                        background-color: #ff0000;
                        color: #fff;
                    }
                }
            }
        }
    }
    .index-nav {
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        .nav-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 1;
            .item-img {
                width: 50px;
                height: 50px;
            }
            // .item-text {
            // }
        }
    }
    .index-main {
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
// .image-enter-active {
//     transform: translateX(0);
//     transition: all 1.5s ease;
// }
// .image-leave-active {
//     transform: translateX(-100%);
//     transition: all 1.5s ease;
// }
// .image-enter {
//     transform: translateX(100%);
// }
// .image-leave {
//     transform: translateX(0);
// }
</style>


