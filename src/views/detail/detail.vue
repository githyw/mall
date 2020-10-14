<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  import DetailNavBar from "./childcomps/DetailNavBar";
    export default {
        name: "detail",
        data() {
          return {
            iid:null,
          }
        },
        components:{
          DetailNavBar
        },
        created() {
          this.iid = this.$route.params.iid;
        }
    }
</script>

<style scoped>

</style>
