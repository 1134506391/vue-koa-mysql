<template>
    <div class="app-register">
        <header class="register-header">店铺注册</header>
        <form class="register-main">
            <div class="main-avator">
                <label class="avator-box">
                    <img class="box-img" :src=imgSrc alt="img">
                    <input class="box-input" type="file" accept="image/png" @change="imgUpload($event)">
                </label>
                <p>上传头像(小于100k的png格式图片))</p>
            </div>
            <div class="main-item">
                <label for="name" class="item-left">账号</label>
                <input type="text" id="name" class="item-right" v-model="shopAccount" placeholder="请输入账号">
            </div>
            <div class="main-item">
                <label for="password" class="item-left">密码</label>
                <input type="text" id="password" class="item-right" v-model="shopPassword" placeholder="请输入密码">
            </div>
            <div class="main-item">
                <label for="passwordAgain" class="item-left">重复密码</label>
                <input type="text" id="passwordAgain" class="item-right" v-model="shopPasswordAgain" placeholder="请输入密码">
            </div>
            <div class="main-item">
                <label class="item-left">
                    <span>分类</span>
                    <select v-model="shopCategoryId" @change="getId">
                        <option  v-for="item in goodsCategoryData" :key="item.goods_category_id" :value="item.goods_category_id">{{item.goods_category_name}}</option>
                    </select>
                    
                </label>

            </div>
            <div class="main-item">
                <label for="phone" class="item-left">名字</label>
                <input type="text" id="phone" class="item-right" v-model="shopName" placeholder="请输入手机号码">
            </div>
            <div class="main-item">
                <label for="phone" class="item-left">简介</label>
                <input type="text" id="phone" class="item-right" v-model="shopDesc" placeholder="请输入手机号码">
            </div>
            <div class="main-item">
                <label for="phone" class="item-left">手机</label>
                <input type="text" id="phone" class="item-right" v-model="shopPhone" placeholder="请输入手机号码">
            </div>
            <div class="main-item">
                <label for="phone" class="item-left">地址</label>
                <input type="text" id="phone" class="item-right" v-model="shopAddress" placeholder="请输入手机号码">
            </div>
        </form>
        <footer @click="submit($event)" class="register-footer">提交</footer>
        
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsCategoryData:[],
            imgSrc: "../../../static/upload_img.png",
            shopAccount: "",
            shopPassword: "",
            shopPasswordAgain: "",
            shopCategoryId: "",
            shopName: "",
            shopDesc: "",
            shopPhone: "",
            shopImg: "",
            shopAddress: ""
        };
    },
    methods: {
        getGoodsCategoryData(){
            axios.get(this.URL + 'goodsCategorySelect')
                .then(response => {
                    this.goodsCategoryData = response.data.data;
                    this.shopCategoryId = this.goodsCategoryData[0].goods_category_id
                })
                .catch(error => [
                    console.log(error)
                ])
        },
        getId(){
            console.log(this.shopCategoryId)
        },
        imgUpload(event) {
            var windowURL = window.URL || window.webkitURL;
            this.shopImg = event.target.files[0];
            if (this.shopImg.size > 1024 * 100) {
                //100kb
                console.log("图片太太了");
                return false;
            }
            this.imgSrc = windowURL.createObjectURL(event.target.files[0]);
            console.log(this.shopImg);
        },
        submit(event) {
            if (
                this.shopAccount === "" ||
                this.shopPassword === "" ||
                this.shopPasswordAgain === "" ||
                this.shopCategoryId === "" ||
                this.shopName === "" ||
                this.shopDesc === "" ||
                this.shopPhone === "" ||
                this.shopImg === "" ||
                this.shopAddress === ""
            ) {
                alert("请填写完整表单");
                return false;
            } else {
                event.preventDefault();
                let data = {
                    shopAccount: this.shopAccount,
                    shopPassword: this.shopPassword,
                    shopCategoryId: this.shopCategoryId,
                    shopName: this.shopName,
                    shopDesc: this.shopDesc,
                    shopPhone: this.shopPhone,
                    shopAddress: this.shopAddress
                };
                data = JSON.stringify(data);
                let formData = new FormData();
                formData.append("file", this.shopImg);
                formData.append("data", data);
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };
                axios
                    .post(this.URL + "shopAdd", formData, config)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    },
    created(){
        this.getGoodsCategoryData()
    }
};
</script>
<style scoped lang="scss">
.app-register {
    .register-header {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        color: #fff;
        background-color: #e93b3d;
    }
    .register-main {
        .main-avator {
            display: flex;
            flex-direction: column;
            align-items: center;
            .avator-box {
                display: inline-block;
                width: 80px;
                height: 80px;
                box-sizing: border-box;
                // border: 1px solid #ccc;
                border-radius: 50%;
                .box-img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    border: 1px solid #ccc;
                }
                .box-input {
                    display: none;
                }
            }
        }
        .main-item {
            display: flex;
            .item-left {
                flex: 0 0 50px;
                width: 50px;
                margin-left: 20px;
            }
            .item-right {
                flex: 1;
                margin-right: 20px;
            }
        }
    }
    .register-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        margin: 0 20px;
        color: #fff;
        background-color: #e93b3d;
    }
}
</style>



