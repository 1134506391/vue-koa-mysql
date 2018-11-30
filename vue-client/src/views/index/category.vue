<template>
    <div class="app-category">
        <header class="category-header">
            <span class="header-left" @click="$router.back(-1)">返回</span>
            <span class="header-center">分类</span>
            <span class="header-right">...</span>
        </header>
        <main class="category-main">
            <div class="main-left">
                <div v-for="(item,index) in shopCategroyData" :class="{actived:index === shopCategroyActived}" @click="shopCategroyClick(index,item.shop_category_id)" :key="item.id" class="left-item">
                    {{item.shop_category_name}}
                </div>
            </div>
            <div class="main-right">
                <div class="right-item">
                    
                    <div v-if="shopActived == item.shop_category_id" v-for="(item,index) in shopData" :key="item.id" class="item-list">
                        <router-link :to="{ path: '/goods', query: {id: item.shop_id} }">
                            <img v-lazy="IMAGESURL + item.shop_img">
                            <p>{{item.shop_name}}</p>
                        </router-link>
                        
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shopCategroyData: "",
            shopCategroyActived: 0,
            //
            shopData: "",
            shopActived: 1
        };
    },
    methods: {
        getshopCategroyData() {
            axios
                .get(this.URL + "shopCategorySelect")
                .then(response => {
                    this.shopCategroyData = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        shopCategroyClick(index, id) {
            this.shopCategroyActived = index;
            this.shopActived = id;
        },
        //
        getshopData() {
            axios
                .get(this.URL + "shopSelect")
                .then(response => {
                    // console.log(response.data.data);
                    this.shopData = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created() {
        this.getshopCategroyData();
        this.getshopData();
    }
};
</script>

<style lang="scss" scoped>
.app-category {
    .category-header {
        // height: 40px;
        // text-align: center;
        // line-height: 40px;
        // border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        padding: 0 10px;
        border-bottom: 1px solid #ccc;
    }
    .category-main {
        .main-left {
            position: fixed;
            left: 0;
            top: 50px;
            bottom: 60px;
            width: 80px;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: #f8f8f8;
            .left-item {
                width: 100%;
                height: 40px;
                text-align: center;
                line-height: 40px;
                &.actived {
                    color: #ff0000;
                    background-color: #fff;
                }
            }
        }
        .main-right {
            margin-left: 80px;
            .right-item {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                .item-list {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    flex: 0 0 33.3%;
                    width: 33.3%;
                    height: 80px;
                    img {
                        width: 50px;
                        height: 50px;
                    }
                }
            }
        }
    }
}
</style>


