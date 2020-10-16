<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item.id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HywRecommend",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding: 12px 0 18px 0;
  border-bottom: 15px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 5px;
}
</style>
