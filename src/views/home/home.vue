<template>
  <div id="home">
    <nav-bar class="nav"> <div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <hyw-recommend :recommend="recommend"></hyw-recommend>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import HywRecommend from "./childComps/HywRecommend";
import { getHomeMultidata } from "network/home";
export default {
  name: "home",
  data() {
    return {
      banners: [],
      recommend: [],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HywRecommend,
  },
  // axios请求接口路径
  created() {
    getHomeMultidata().then((res) => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommend = res.data.recommend.list;
    });
  },
};
</script>

<style scoped>
.nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
