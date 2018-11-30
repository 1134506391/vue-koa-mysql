<template>
    <div id="app">

        <router-view/>
        <div id="loading" ref="loading" class="loading" style="display:none;">
            <div class="spinner">
                <div class="spinner-container container1">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
                <div class="spinner-container container2">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
                <div class="spinner-container container3">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
            </div>
            <div>数据正在加载中....</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style src='./assets/css/demo.css'></style>
<style src='./assets/css/iconfont.css'></style>
<style lang="scss">

* {
    padding: 0;
    margin: 0;
}
html,body{
    height: 100%;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 14px;
}
ul,
li {
    list-style: none;
}
a {
    text-decoration: none;
    color: #2c3e50;
}
i.icon{
    font-size: 30px;
}
.loading {
    text-align: center;
}
.spinner {
    margin: 100px auto 20px auto;
    width: 50px;
    height: 50px;
    position: relative;
}

.container1 > div,
.container2 > div,
.container3 > div {
    width: 10px;
    height: 10px;
    background-color: #333;

    border-radius: 100%;
    position: absolute;
    -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
    animation: bouncedelay 1.2s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

.spinner .spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
}

.container2 {
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
}

.container3 {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
}

.circle1 {
    top: 0;
    left: 0;
}
.circle2 {
    top: 0;
    right: 0;
}
.circle3 {
    right: 0;
    bottom: 0;
}
.circle4 {
    left: 0;
    bottom: 0;
}

.container2 .circle1 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.container3 .circle1 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
}

.container1 .circle2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.container2 .circle2 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

.container3 .circle2 {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
}

.container1 .circle3 {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
}

.container2 .circle3 {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
}

.container3 .circle3 {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
}

.container1 .circle4 {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
}

.container2 .circle4 {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
}

.container3 .circle4 {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
}

@-webkit-keyframes bouncedelay {
    0%,
    80%,
    100% {
        -webkit-transform: scale(0);
    }
    40% {
        -webkit-transform: scale(1);
    }
}

@keyframes bouncedelay {
    0%,
    80%,
    100% {
        transform: scale(0);
        -webkit-transform: scale(0);
    }
    40% {
        transform: scale(1);
        -webkit-transform: scale(1);
    }
}
::-webkit-scrollbar {
    display: none;
}

input {
    height: 36px;
    padding: 0 14px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    border-radius: 4px;
    outline: none;
}
textarea{
    height: 100px;
    padding: 14px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    border-radius: 4px;
    outline: none;
}
button {
    height: 36px;
    padding: 0 14px;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
}
button.small {
    height: 30px;
}
button.info {
    color: #fff;
    background-color: #20a0ff;
    border: 1px solid #20a0ff;
    &:hover {
        opacity: 0.7;
    }
}
button.success {
    background-color: #13ce66;
    border: 1px solid #13ce66;
    color: #fff;
    &:hover {
        opacity: 0.7;
    }
}
button.warm {
    background-color: #ff4949;
    border: 1px solid #ff4949;
    color: #fff;
    &:hover {
        opacity: 0.7;
    }
}


table {
    table-layout: fixed;
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    thead {
        tr {
            display: table-row;
            height: 40px;
            border: 1px solid #bfcbd9;
            box-sizing: border-box;
            background-color: #eef1f6;
            &:hover {
                background-color: #eef1f6;
            }
            th {
                display: table-cell;
                border: 1px solid #bfcbd9;
                box-sizing: border-box;
            }
        }
    }
    tbody {
        tr {
            display: table-row;
            height: 40px;
            border: 1px solid #bfcbd9;
            box-sizing: border-box;
            &:hover {
                background-color: #eef1f6;
            }
            td {
                display: table-cell;
                border: 1px solid #bfcbd9;
                box-sizing: border-box;
                img{
                    display: block;
                    width: 80%;
                    height: auto;
                    margin: auto;
                }
            }
        }
    }
}
</style>
