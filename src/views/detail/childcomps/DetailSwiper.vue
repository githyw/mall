<template>
  <van-swipe class="detail-swiper" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in topImages" class="detail-swiper-item">
      <img :src="item" alt="" @load="swipeLoad">
    </van-swipe-item>

  </van-swipe>
</template>

<script>
  import { Swipe, SwipeItem } from 'vant';
    export default {
        name: "DetailSwiper",
        data(){
            return {
            }
        },
      props:{
          topImages:{
            type:Array,
            default(){
              return []
            }
          }
      },
      components:{
        Swipe,
        SwipeItem,
      },
      methods:{
        swipeLoad(){
          this.$emit("swipeLoad")
        }
      }

    }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
  .detail-swiper-item img{
    width: 100%;
  }
</style>
