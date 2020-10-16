import BackTop from "components/content/BackTop/BackTop";
/*
* 1.引入返回顶部模块
* 2.
* */
export const top={
  data(){
    return {
      isShowBackTop: false,
    }
  },
  components:{
    BackTop,
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0,1000);

    },
    contentScroll(position) {
      this.isShowBackTop =( -position.y) > 1000;
    }
  }
}
