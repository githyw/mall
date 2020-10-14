<template>
  <van-swipe class="detail-swiper" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in banners" :key="item.id" class="detail-swiper-item">
      <img :src="item.image" alt="" @load="imageLoad" />
    </van-swipe-item>
  </van-swipe>


</template>

<script>
  import { Swipe, SwipeItem } from 'vant';
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
    data() {
      return {
        isLoad:false,
      }
    }
  },
  components: {
    Swipe,
    SwipeItem,
  },
  methods: {
    imageLoad() {
      // console.log("+++++");
      if(!this.isLoad){
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped>
  .detail-swiper{
    height: 200px;
    overflow: hidden;
  }
  .detail-swiper-item img{
    width: 100%;
  }
</style>
