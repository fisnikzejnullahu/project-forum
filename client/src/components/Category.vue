<template>
  <div class="container">
    <div class="loader" v-show="isLoading"></div>
  </div>
</template>

<script>
import Api from "@/API";

export default {
  data() {
    return {
      isLoading: true,
      category: {}
    };
  },
  async created() {
    this.$router.push("/?category=" + this.$route.params.id);
    // this.$store.dispatch("posts/search", this.searchHint);
    // console.log("SEARCHED " + this.searchHint);
  }
};
</script>

<style>
.loader {
  position: fixed;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: url("//upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Phi_fenomeni.gif/50px-Phi_fenomeni.gif")
    50% 50% no-repeat rgb(249, 249, 249);
}
</style>

