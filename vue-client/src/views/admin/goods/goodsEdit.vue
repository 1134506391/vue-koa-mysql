<template>
    <div class="app-goodsEdit">
        <h1>商品编辑</h1>
        <div class="goodsEdit-main">
            <label class="main-item">
                <span class="item-left">商品名字</span>
                <input class="item-right" type="text" v-model="goodsName">
            </label>
            <label class="main-item">
                <span class="item-left">商品描述</span>
                <textarea class="item-right" v-model="goodsDesc"></textarea>
            </label>
            <label class="main-item">
                <span class="item-left">商品图片</span>
                <div class="item-right">
                    <img class="right-img" :src="IMAGESURL + goodsImg" alt="img">
                    <input class="right-input" type="file" @change="getAvator($event)">
                </div>
            </label>
            <label class="main-item">
                <span class="item-left">商品价格</span>
                <input class="item-right" type="number" v-model="goodsPrice">
            </label>
            <label class="main-item">
                <span class="item-left">商品数量</span>
                <input class="item-right" type="number" v-model="goodsNumber">
            </label>
        </div>
        <footer class="goodsEdit-footer">
            <button @click="editGoodsData" class="info">确定</button>
            <button>取消</button>
            {{oldGoodsImg}}
        </footer>
    </div>
</template>


<script>
export default {
    data() {
        return {
            goodsId: this.$route.query.id,
            goodsName: "",
            goodsDesc: "",
            goodsPrice: "",
            goodsNumber: "",
            goodsImg: "",
            oldGoodsImg: "",
            file: ""
        };
    },
    methods: {
        getGoodsData() {
            axios
                .get(this.URL + "goodsSelectById/" + this.goodsId)
                .then(response => {
                    console.log(response);
                    this.goodsName = response.data.data[0].goods_name;
                    this.goodsDesc = response.data.data[0].goods_desc;
                    this.goodsPrice = response.data.data[0].goods_price;
                    this.goodsNumber = response.data.data[0].goods_number;
                    this.goodsImg = response.data.data[0].goods_img;
                    this.oldGoodsImg = JSON.stringify(this.goodsImg);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getAvator(event) {
            var windowURL = window.URL || window.webkitURL;
            this.file = event.target.files[0];
            this.goodsImg = windowURL.createObjectURL(event.target.files[0]);
            console.log(this.file);
        },
        editGoodsData(event) {
            var params;
            if (this.oldGoodsImg == this.goodsImg) {
                params = {
                    goodsId: this.$route.query.id,
                    goodsName: this.goodsName,
                    goodsDesc: this.goodsDesc,
                    goodsPrice: this.goodsPrice,
                    goodsNumber: this.goodsNumber
                };
            } else {
                params = {
                    goodsId: this.$route.query.id,
                    goodsName: this.goodsName,
                    goodsDesc: this.goodsDesc,
                    goodsPrice: this.goodsPrice,
                    goodsNumber: this.goodsNumber,
                    goodsImg: this.goodsImg
                };
            }
            event.preventDefault();
            let formData = new FormData();
            let data = params;
            data = JSON.stringify(data);
            formData.append("file", this.file);
            formData.append("data", data);
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };
            axios
                .put(this.URL + "goodsUpdate", formData, config)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created() {
        this.getGoodsData();
    },
    mounted() {
        console.log(this.goodsId);
    }
};
</script>

<style lang="scss" scoped>
.app-goodsEdit {
    .goodsEdit-main {
        .main-item {
            display: flex;
            margin-bottom: 20px;
            .item-left {
                flex: 0 0 100px;
                width: 100px;
                height: 40px;
                line-height: 40px;
            }
            .item-right {
                flex: 0 0 360px;
                width: 360px;
                .right-img {
                    display: block;
                    width: 200px;
                    height: 200px;
                    box-sizing: border-box;
                    border: 1px dashed #ccc;
                    border-radius: 4px;
                    &:hover {
                        border: 1px dashed #20a0ff;
                    }
                }
                .right-input {
                    display: none;
                }
            }
        }
    }
    .goodsEdit-footer {
        margin-left: 100px;
    }
}
</style>
