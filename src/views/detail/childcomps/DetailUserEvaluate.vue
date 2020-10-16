<template>
  <div class="user-evaluate" v-if="Object.keys(UserEvaluate)">
    <div class="user-evaluate-top">
      <span class="user-evaluate-top-left">用户评价</span>
      <a href="javascript" class="user-evaluate-top-right">更多</a>
    </div>
    <div class="uesr-evaluate-item">
     <div class="user">
       <img :src="UserEvaluate.avatar" alt="">
        <span class="user-right">{{UserEvaluate.uname}}</span>
     </div>
      <div class="user-content">{{UserEvaluate.content}}</div>
      <div class="user-style" v-if="UserEvaluate.style">2020-12-01  {{UserEvaluate.style}}</div>
      <div class="merchant" v-if="UserEvaluate.explain">{{UserEvaluate.explain}}</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DetailUserEvaluate",
      props:{
        UserEvaluate:{
          type:Object,
          default() {
            return {}
          }
        }
      }
    }
</script>

<style scoped>
  .user-evaluate{
  }
  .user-evaluate-top{
    padding: 25px 0;
    font-size: 16px;
    border-top: solid 1px #e1e1e2;
    width:calc(100% - 30px);
    border-left: solid 1px #e1e1e2;
    border-right: solid 1px #e1e1e2;
    margin: 10px auto 0;

  }
  .user-evaluate-top-left{
    margin-left: 30px;
    font-weight: 700;
  }
  .user-evaluate-top-right{
    float: right;
    margin-right: 35px;
    font-weight: 700;
  }
  .uesr-evaluate-item{
    padding-top: 20px;
    text-indent: 1em;
    width:calc(100% - 30px);
    border: solid 1px #e1e1e2;
    margin: 0 auto;

  }
  .user img{
    width: 40px;
    vertical-align:middle
  }
  .user-right{
    font-weight: 700;
    margin-left: 10px;
  }
  .user-content{
    padding: 20px 0;

  }
  .user-style{
    padding-bottom: 30px;
    font-size: 14px;
    color: #a9acb8;
  }
  .merchant{
    padding-bottom: 20px;
  }
</style>
