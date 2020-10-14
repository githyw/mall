<template>
  <div id="home">
    <nav-bar class="nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新品', '精选']"
      @tabClick="tabClick"
      class="TabControl"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probeType="2"
      :pullUpLoad="true"
      @pullingUp="loadMore"
      @scroll="contentScroll"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <hyw-recommend :recommend="recommend"></hyw-recommend>
      <recommend />
      <tab-control
        :titles="['流行', '新品', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      />
      <goods-list :goods="showGoods" />
    </scroll>
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

import { getHomeGoods, getHomeMultidata } from "network/home";

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
      isTabOffsetTop: 0,
      isTabFixed: false,
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
    //调用防抖函数
    const refresh = this.debounce(this.$refs.scroll.refresh);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  activated() {
    // console.log("activater");
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log("deactivated");
    // console.log(this.$refs.scroll.getScrollY());
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    //防抖 封装debounce函数，作用是不会频繁调用，如果下一次执行来的非常快，那么会将上一次取消掉
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        //timer有值   取消掉timer
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    tabClick(index) {
      this.$refs.tabControl.crrentIndex = index;
      this.$refs.tabControl1.crrentIndex = index;

      switch (index) {
        case 0:
          this.currentType = "pop";
          return;
        case 1:
          this.currentType = "new";
          return;
        case 2:
          this.currentType = "sell";
          return;
      }
    },
    //返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0,1000);
    },
    //监听滚动事件
    contentScroll(position) {
      //监听返回顶部按钮的显示与隐藏
      this.isShowBackTop =( -position.y) > 1000;
      this.isTabFixed =( -position.y) > this.isTabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.isTabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
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

.TabControl {
  position: relative;
  z-index: 1;
}
</style>
