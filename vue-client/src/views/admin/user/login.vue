<template>

    <div class="app-login">
        <header class="login-header">shop登录</header>
        <form class="login-main">
            <div class="main-item">
                <label for="name" class="item-left">账号</label>
                <input type="text" id="name" class="item-right" v-model="shopAccount" placeholder="请输入账号">
            </div>
            <div class="main-item">
                <label for="password" class="item-left">密码</label>
                <input type="text" id="password" class="item-right" v-model="shopPassword" placeholder="请输入密码">
            </div>
        </form>
        <footer @click="loginSubmit" class="login-footer">登录</footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shopAccount: "",
            shopPassword: "",
        };
    },
    methods: {
        loginSubmit() {
            axios
                .post("http://localhost:3000/shopLogin", {
                    shopAccount: this.shopAccount,
                    shopPassword: this.shopPassword
                })
                .then(response => {
                    if (response.data.state == 200) {
                        // console.log(response.data.data)
                        let shopInfo = response.data.data;
                        sessionStorage.shopInfo = JSON.stringify(shopInfo);
                        this.$store.commit("setShopInfo", shopInfo);
                        this.$router.push({ path: '/admin' })
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>
<style scoped lang="scss">
.app-login {
    .login-header {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        color: #fff;
        background-color: #e93b3d;
    }
    .login-main {
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
    .login-footer {
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




