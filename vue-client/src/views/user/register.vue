<template>
    <div class="app-register">
        <header class="register-header">注册</header>
        <form class="register-main">
            <div class="main-avator">
                <label class="avator-box">
                    <img class="box-img" :src=src alt="img">
                    <input class="box-input" type="file" @change="getAvator($event)">
                </label>
                <p>更换默认头像</p>
            </div>
            <div class="main-item">
                <label for="name" class="item-left">账号</label>
                <input type="text" id="name" class="item-right" v-model="userName" placeholder="请输入账号">
            </div>
            <div class="main-item">
                <label for="password" class="item-left">密码</label>
                <input type="text" id="password" class="item-right" v-model="userPassword" placeholder="请输入密码">
            </div>
            <div class="main-item">
                <label for="passwordAgain" class="item-left">重复密码</label>
                <input type="text" id="passwordAgain" class="item-right" v-model="userPasswordAgain" placeholder="请输入密码">
            </div>
            <div class="main-item">
                <label for="phone" class="item-left">手机</label>
                <input type="text" id="phone" class="item-right" v-model="userPhone" placeholder="请输入手机号码">
            </div>
            <div class="main-item">
                <label class="item-left">性别</label>
                <div class="item-right"><input type="radio" id="man" value="男" v-model="userGender">
                    <label for="man">男</label>
                    <input type="radio" id="woman" value="女" v-model="userGender">
                    <label for="woman">女</label>
                </div>

            </div>
            <div class="main-item">
                <label class="item-left">角色</label>
                <div class="item-right">
                    <input type="radio" id="customer" value="顾客" v-model="userType">
                    <label for="customer">顾客</label>
                    <input type="radio" id="shop" value="商家" v-model="userType">
                    <label for="shop">商家</label>
                </div>

            </div>
        </form>
        <footer @click="submit($event)" class="register-footer">提交</footer>

    </div>
</template>

<script>
export default {
    data() {
        return {
            userAvatorURL: "../../../static/avator.png",
            userName: "",
            userPassword: "",
            userPasswordAgain: "",
            userPhone: "",
            userGender: "",
            userType: "",
            src: "../../../static/avator.png",
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
        submit(event) {
            if (
                this.file === "" ||
                this.userName === "" ||
                this.userPassword === "" ||
                this.userPhone === "" ||
                this.userGender === "" ||
                this.userType === ""
            ) {
                alert("aa");
                return false;
            } else {
                event.preventDefault();

                let formData = new FormData();
                let data = {
                    userName: this.userName,
                    userPassword: this.userPassword,
                    userPhone: this.userPhone,
                    userGender: this.userGender,
                    userType: this.userType
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
                        "http://localhost:3000/userInsertInto",
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
                border: 1px solid #ccc;
                border-radius: 50%;
                .box-img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
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



