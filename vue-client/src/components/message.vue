<template>
    <transition name="message-fade">
        <div class="message" v-show="show">
        <span class="icon"><icon name="info"></icon></span>
            <p>{{message}}</p>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'v-message',
        mounted(){
            this.StartTime();
        },
        data(){
            return {
                message: '123',
                show: false,
                timer: null
            }
        },
        methods:{
            StartTime(){
                this.show = true;
                if(this.timer){
                    clearTimeOut(this.timer)
                }else{
                    this.timer = setTimeout(()=>{
                        this.show = false
                    }, 3000);
                }
            }
        }
    }
</script>