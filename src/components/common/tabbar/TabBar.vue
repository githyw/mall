<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {};
  },
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  z-index: 100;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0px -2px 1px rgba(100, 100, 100, 0.1);
}
</style>
