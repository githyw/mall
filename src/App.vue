<template>
  <div id="app">
    <router-view />
    <div id="nav">
      <main-tabbar></main-tabbar>
    </div>
  </div>
</template>
<script>
import MainTabbar from "components/content/MainTabbar";
export default {
  name: "App",
  components: {
    MainTabbar,
  },
};
</script>
<style>
@import "./assets/css/base.css";
</style>
