<template>

    <div class="app-login">
        <header class="login-header">
           
            <router-link to="/">首页</router-link>
            <span class="header-center">登录</span>
            <span class="header-right">
                <i class="icon iconfont icon-gengduo"></i></span>
            </header>
        <img class="login-logo" src="@/assets/logo.png" alt="img">
        <form class="login-main">
            <div class="main-item">
                <label for="name" class="item-top">账号</label>
                <input type="text" id="name" class="item-bottom" v-model="userName" placeholder="请输入账号">
            </div>
            <div class="main-item">
                <label for="password" class="item-top">密码</label>
                <input type="text" id="password" class="item-bottom" v-model="userPassword" placeholder="请输入密码">
            </div>
        </form>
        <footer @click="loginSubmit" class="login-footer">
            <p class="footer-forget">忘记密码?</p>
            <button class="footer-login warm">登录</button>
            <p class="footer-register">新用户?<router-link to="/register">注册</router-link></p>
        </footer>
        
        {{this.$store.state.userInfo.user_id}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: "",
            userPassword: ""
        };
    },
    methods: {
        loginSubmit() {
            axios
                .post("http://localhost:3000/userLogin", {
                    userName: this.userName,
                    userPassword: this.userPassword
                })
                .then(response => {
                    if (response.data.state == 200) {
                        let userInfo = response.data.data[0];

                        sessionStorage.userInfo = JSON.stringify(userInfo);
                        // _this.$store.dispatch("setUserInfo", user);
                        this.$store.commit("setUserInfo", userInfo);
                        this.$router.push({ path: "/" });
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
        justify-content: space-between;
        height: 50px;
        padding: 0 10px;
        border-bottom: 1px solid #ccc;
        color: #fff;
        background-color: #e93b3d;
        a{
            color: #fff;
        }
    }
    .login-logo {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: 80px auto;
    }
    .login-main {
        margin: 0 20px;
        .main-item {
            .item-top {
                display: block;
                width: 100%;
                line-height: 40px;
                font-weight: bold;
            }
            .item-bottom {
                display: block;
                width: 100%;
                height: 40px;
                padding-left: 0;
                border: none;
                border-bottom: 1px solid #ccc;
                border-radius: 0;
            }
        }
    }
    .login-footer {
        margin: 0 20px;
        .footer-forget{
            text-align: right;
            line-height: 60px;
            color: #999;
        }
        .footer-login {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            background-color: #e93b3d;
        }
        .footer-register{
            text-align: center;
            line-height: 80px;
            color: #999;
            a{
                color: #e93b3d;
            }
        }
    }
}
</style>




