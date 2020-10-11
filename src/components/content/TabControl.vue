<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item.id"
      @click="itemClick(index)"
      class="tab-control-item"
      :class="{ active: index === crrentIndex }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      crrentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.crrentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  /* position: sticky; */
  top: 44px;
  display: flex;
  font-size: 15px;
  text-align: center;
  background-color: #fff;
  z-index: 2;
}
.tab-control-item {
  height: 40px;
  line-height: 40px;
  flex: 1;
}
.tab-control-item span {
  padding: 10px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
