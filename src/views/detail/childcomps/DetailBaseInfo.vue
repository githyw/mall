<template>
  <div v-if="Object.keys(goods).length !==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.price}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discountDesc" class="discountDesc">{{goods.discountDesc}}</span>
    </div>
    <div class="info-other">
      <span class="info-other-item">{{goods.columns[0]}}</span>
      <span class="info-other-item">{{goods.columns[1]}}</span>
      <span class="info-other-item">{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services" v-for="index in goods.services.length-1" :key="index">
      <span class="info-services-item">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>

  </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
        props:{
          goods:{
            type:Object,
            default(){
              return {}
            }
          }
        }
    }
</script>

<style scoped>
  .info-title{
    font-size: 20px;
    color: #242424;
    font-weight: 700;
    padding: 20px 0;
    text-indent: 1em;
}

  .n-price{
    font-size: 25px;
    color: #e33e33;
  }
  .o-price{
    font-size: 12px;
    text-decoration:line-through;
  }

  .discountDesc{
    margin-left: 5px;
    color: #f6f6f6;
    background-color:#e33e33;
    border-radius: 10px;
    font-size: 13px;
    padding: 3px 5px;
    font-weight: 700;
    vertical-align: top;
  }
  .info-other{
    display: flex;
    margin-top: 30px;
    font-size: 14px;
  }
  .info-other-item{
    flex: 1;
    text-align: center;
    padding-bottom: 25px;
    border-bottom: solid 1px #d3d3d3;
  }
  .info-services{
    margin-top: 10px;
    margin-left: 10px;
    display: inline-block;
  }
  .info-services-item img{
    width: 18px;
    vertical-align: middle;
  }

</style>
