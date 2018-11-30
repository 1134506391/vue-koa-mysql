<template>

    <div class="app-goodsInfo">
        <header class="goodsInfo-header">
            header
        </header>
        <div class="goodsInfo-main">
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>账号</th>
                        <th>密码</th>
                        <th>名字</th>
                        <th>店铺详情</th>
                        <th>电话</th>
                        <th>图片</th>
                        <th>地址</th>
                        <th>店铺分类id</th>
                        <th>权重</th>
                        <th>状态</th>
                        <th>创建时间</th>
                        <th>最后修改时间</th>
                        <th>操作</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in shopData" :key="item.id">
                        <td>{{item.shop_id}}</td>
                        <td>{{item.shop_account}}</td>
                        <td>{{item.shop_password}}</td>
                        <td>{{item.shop_name}}</td>
                        <td>{{item.shop_desc}}</td>
                        <td>{{item.shop_phone}}</td>
                        <td>
                            <img class="item-img" v-lazy="IMAGESURL + item.shop_img" alt="img">
                        </td>
                        <td>{{item.shop_address}}</td>
                        <td>{{item.shop_category_id}}</td>

                        <td>{{item.shop_priority}}</td>
                        <td>{{item.shop_state}}</td>
                        <td>{{item.create_time}}</td>
                        <td>{{item.last_edit_time}}</td>
                        <td>
                            <button @click="deleteGoodsById(item.shop_id)" class="warm small">删除</button>

                        </td>
                        <td>
                            <router-link :to="{path:'/admin/goodsEdit',query:{id:item.shop_id}}">
                                <button class="small">编辑</button>
                            </router-link>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <footer class="goodsInfo-footer">
            <com-page @childToFather="changeNumber($event)" ref="pages"></com-page>
            <!-- <div class="app-page">
                <span>共{{count}}条</span>
                <span>{{pageNumber}}/{{pages}}</span>
    
                <button @click="pagePrev">上一页</button>
                <button @click="pageNext">下一页</button>
                <span>前往</span>
                <input type="number" v-model="pageNumber" min="1" :max="pages">
                <button @click="changeNumber">确定</button>

            </div> -->
            <!-- <div class="app-page" v-show="pages>1">
                <p class="page-number">
                    <span>{{pageNumber}}/{{pages}}</span>

                    <ul class="page-dialog" :class="{bottom:bottomclass}" v-show="pagedialog">
                        <li class="page-item" v-for="item in pages" :key="item.id" :class="{currentpage:item==pageNumber}" @click="changeNumber(item)">{{item}}/{{pages}}</li>
                    </ul>
                </p>
                <img class="page-more" src="../assets/images/page_more.png" alt="img" @click="pageDialogToggle">

                <button @click="prev">
                    <img src="../assets/images/page_prev.png" alt="img">
                </button>
                <button class="app-btn-gray" @click="next">
                    <img src="../assets/images/page_next.png" alt="img">
                </button>
            </div> -->

        </footer>
    </div>
</template>


<script>
import comPage from "@/components/comPage";
export default {
    components: {
        comPage
    },
    data() {
        return {
            shopData: [],
            pages: 1,
            pageNumber: 1,
            count: 0
        };
    },
    methods: {
        getShopData() {
            axios
                .get(this.URL + "shopSelectPage/" + this.pageNumber)
                .then(response => {
                    console.log(response);
                    this.shopData = response.data.data;
                    this.pages = response.data.pages;
                    this.count = response.data.count;
                    this.$refs.pages.reset(this.pages, this.pageNumber,this.count)
                })
                .catch(error => {
                    console.log(error);
                });
        },
        deleteGoodsById(id) {
            axios
                .delete(this.URL + "goodsDeleteById/" + id)
                .then(response => {
                    console.log(response);
                    this.getGoodsData();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        pagePrev() {
            if (this.pageNumber <= 1) {
                this.pageNumber = 1;
            } else {
                this.pageNumber--;
                this.getShopData();
            }
        },
        pageNext() {
            if (this.pageNumber >= this.pages) {
                this.pageNumber = this.pages;
                return false;
            } else {
                this.pageNumber++;
                this.getShopData();
            }
        },
        changeNumber(numbers) {
            // alert(numbers)
            this.pageNumber = numbers;
            this.getShopData(this.pageNumber);
        }
    },
    created() {
        this.getShopData();
    }
};
</script>
