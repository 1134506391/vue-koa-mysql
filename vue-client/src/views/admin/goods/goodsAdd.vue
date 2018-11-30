
<template>
    <div class="app-goodsAdd">
        <h1>商品新增</h1>
        <div class="goodsAdd-main">
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
                    <img class="right-img" :src=src alt="img">
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
        <footer class="goodsAdd-footer">
            <button @click="submitData($event)" class="info">确定</button>
            <button>取消</button>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsShopId:1,
            goodsName: "",
            goodsDesc: "aa",
            goodsPrice: 0,
            goodsNumber: 0,
            src: "../../../static/upload_img.png",
            file: ""
        };
    },
    methods: {
        getAvator(event) {
            var windowURL = window.URL || window.webkitURL;
            this.file = event.target.files[0];
            this.src = windowURL.createObjectURL(event.target.files[0]);
            console.log(this.file);
        },
        submitData(event) {
            if (
                this.goodsName === "" ||
                this.goodsDesc === "" ||
                this.goodsPrice === "" ||
                this.goodsNumber === "" ||
                this.file === ""
            ) {
                return false;
            } else {
                event.preventDefault();
                let formData = new FormData();
                let data = {
                    goodsName: this.goodsName,
                    goodsDesc: this.goodsDesc,
                    goodsPrice: this.goodsPrice,
                    goodsNumber: this.goodsNumber,
                    goodsShopId:this.goodsShopId
                };
                data = JSON.stringify(data);
                formData.append("file", this.file);
                formData.append("data", data);
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };
                axios
                    .post(
                        "http://localhost:3000/goodsInsertInto",
                        formData,
                        config
                    )
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.app-goodsAdd {
    .goodsAdd-main {
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
    .goodsAdd-footer {
        margin-left: 100px;
    }
}
</style>


