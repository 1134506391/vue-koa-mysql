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
                        <th>名字</th>
                        <th>状态</th>
                        <th>图片</th>
                        <th>价格</th>
                        <th>商品详情</th>
                        <th>库存</th>
                        <th>权重</th>
                        <th>创建时间</th>
                        <th>最后修改时间</th>
                        <th>操作</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in goodsData" :key="item.id">
                        <td>{{item.goods_id}}</td>
                        <td>{{item.goods_name}}</td>
                        <td>{{item.goods_state}}</td>
                        <td>
                            <img class="item-img" v-lazy="IMAGESURL + item.goods_img" alt="img">
                        </td>
                        <td>{{item.goods_price}}</td>
                        <td>{{item.goods_desc}}</td>
                        <td>{{item.goods_number}}</td>
                        <td>{{item.goods_priority}}</td>
                        <td>{{item.create_time}}</td>
                        <td>{{item.last_edit_time}}</td>
                        <td>
                            <button @click="deleteGoodsById(item.goods_id)" class="warm small">删除</button>

                        </td>
                        <td>
                            <router-link :to="{path:'/admin/goodsEdit',query:{id:item.goods_id}}">
                                <button class="small">编辑</button>
                            </router-link>
                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <footer class="goodsInfo-footer"></footer>
    </div>
</template>


<script>
export default {
    data() {
        return {
            goodsData: []
        };
    },
    methods: {
        getGoodsData() {
            axios
                .get(this.URL + "goodsSelectByShopId/" + 4)
                .then(response => {
                    console.log(response);
                    this.goodsData = response.data.data;
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
        }
    },
    created() {
        this.getGoodsData();
    }
};
</script>
