<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
/* @import url(https://bootswatch.com/4/cosmo/bootstrap.min.css); */
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500");

@import "./assets/bona/common-css/bootstrap.css";
@import "./assets/bona/common-css/ionicons.css";
@import "./assets/bona/layout-1/css/styles.css";
@import "./assets/bona/layout-1/css/responsive.css";
</style>