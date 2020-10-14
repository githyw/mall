<template>
    <div class="DetailNavBar">
      <nav-bar >
        <div slot="left" class="detail-left" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="detail">
          <div v-for="(item,index) in titles" :key="item.id"
               class="detail-item"
               @click="detailClick(index)"
               :class="{active:index===currentIdex}">{{item}}</div>
        </div>

      </nav-bar>
    </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  export default {
        name: "DetailNavBar",
        data(){
          return {
            titles:['商品','参数','评论','推荐'],
            currentIdex:0,
          }
        },
        components:{
          NavBar
        },
        methods:{
          detailClick(index){
            this.currentIdex = index
          },
          backClick(){
            this.$router.back();
          }
        }
    }
</script>

<style scoped>
  .detail{
    display: flex;
  }
  .detail-item{
    flex: 1;
    font-size: 14px;
  }
  .detail-left{
    margin-top: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
