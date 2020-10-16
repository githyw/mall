<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probeType="2"
            :pullUpLoad="true"
            @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" @swipeLoad="swipeLoad"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-param-info :param-info="GoodsParam"></detail-param-info>
      <detail-user-evaluate :user-evaluate="UserEvaluate"></detail-user-evaluate>
      <detail-goods-info :detail-info="detailInfo"  @imageLoad="detailLoad" ></detail-goods-info>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />

  </div>
</template>

<script>
  import { getdetail,Goods,Shop,GoodsParam,UserEvaluate }from 'network/detail'
  import DetailBaseInfo from "./childcomps/DetailBaseInfo";
  import DetailNavBar from "./childcomps/DetailNavBar";
  import DetailSwiper from "./childcomps/DetailSwiper";
  import DetailShopInfo from "./childcomps/DetailShopInfo";
  import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
  import DetailParamInfo from "./childcomps/DetailParamInfo";
  import DetailUserEvaluate from "./childcomps/DetailUserEvaluate";
  import { top } from "common/mixin"

  import Scroll from "components/common/scroll/scroll"
    export default {
        name: "detail",
        data() {
          return {
            iid: null,
            topImages:[],
            goods: {},
            shop:{},
            detailInfo:{},
            GoodsParam:{},
            UserEvaluate:{}
          }
        },
        mixins:[top],
        components:{
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          DetailShopInfo,
          DetailParamInfo,
          DetailGoodsInfo,
          DetailUserEvaluate,
          Scroll,
        },
        created() {
          this.iid = this.$route.params.iid;
          getdetail(this.iid).then(res=>{
            //获取数据
            console.log(res);
            const data = res.result;

            //获取店铺信息
            this.topImages = data.itemInfo.topImages;

            //获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

            //获取店铺信息
            this.shop = new Shop(data.shopInfo)

            //获取店铺详细信息
            this.detailInfo = data.detailInfo

            //获取尺码数据
            this.GoodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            //获取用户评价
            this.UserEvaluate = new UserEvaluate(data.rate)

          })
        },
      methods:{
          //监听图片加载完成，加载完成后调用refresh()刷新滚动
        detailLoad(){
          // console.log(111)
          this.$refs.scroll.refresh();
        },
        //监听图片加载完成，加载完成后调用refresh()刷新
        swipeLoad(){
          // console.log(222)
          this.$refs.scroll.refresh();
        },
        contentScroll(position) {
          this.isShowBackTop =( -position.y) > 1000;
        }
      }
    }
</script>

<style scoped>
.detail-nav{
  position: relative;
  z-index: 9999;
  height: 44px;
  background-color: #ffffff;
}
  .content{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    width: 100%;
    height:calc(100% - 44px);
    background-color: #ffffff;

  }
</style>
