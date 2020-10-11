<template>
  <div id="home">
    <nav-bar class="nav"> <div slot="center">购物街</div></nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pullUpLoad="true"
      @pullingUp="loadMore"
      @scroll="contentScroll"
    >
      <home-swiper :banners="banners"></home-swiper>
      <hyw-recommend :recommend="recommend"></hyw-recommend>
      <recommend />
      <tab-control :titles="['流行', '新品', '精选']" @tabClick="tabClick" />
      <goods-list :goods="showGoods"
    /></scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HywRecommend from "./childComps/HywRecommend";
import recommend from "./childComps/recommend";

import Scroll from "components/common/scroll/scroll";
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/BackTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "home",
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
    };
  },
  components: {
    HomeSwiper,
    HywRecommend,
    recommend,
    Scroll,
    NavBar,
    GoodsList,
    TabControl,
    BackTop,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // axios请求接口路径
  created() {
    //1.请求多个数据类型
    this.getHomeMultidata();
    //2.请求商品信息
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    //3.监听item中图片加载完成
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          return;
        case 1:
          this.currentType = "new";
          return;
        case 2:
          this.currentType = "sell";
      }
    },
    //返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //显示与隐藏返回顶部按钮
    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //调用finishPullUp 添加下一页图片并进行展示
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.content {
  /* height: 500px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
