<template>
    <div class="app-page">
        <button @click="pagePrev">上一页</button>
        <span>共{{count}}条</span>
        <span>{{pageNumber}}/{{pages}}</span>
        <span>前往</span>
        <input type="number" v-model="pageNumber" min="1" :max="pages">
        <button @click="changeNumber">确定</button>
    <button @click="pageNext">下一页</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageNumber: 1,
            pages: 1,
            count:0
        };
    },
    methods: {
        pagePrev() {
            if (this.pageNumber <= 1) {
                this.pageNumber = 1;
            } else {
                this.pageNumber--;
                this.$emit("childToFather", this.pageNumber);
            }
        },
        pageNext() {
            if (this.pageNumber >= this.pages) {
                this.pageNumber = this.pages;
                return false;
            } else {
                this.pageNumber++;
                this.$emit("childToFather", this.pageNumber);
            }
        },
        changeNumber() {
            this.$emit("childToFather", this.pageNumber);
        },
        reset(pages, numbers,count) {
            this.pages = pages;
            this.pageNumber = numbers;
            this.count = count;
        }
    }
};
</script>

<style lang="scss">
    .app-page{
        // text-align: center;
        height:60px;
        display: flex;
        align-items: center;
        justify-content: center;
        span{
            // margin:0 20px;
        }
    }
</style>