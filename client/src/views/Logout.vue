<template>
  <div class="container">
    <div class="row mt-5">
      <h2 class="text-success">You've been logged out successfully! Come back again...</h2>
    </div>
  </div>
</template>

<script>
import Api from "@/API";
import { mapState } from "vuex";

export default {
  created() {
    this.$store.dispatch("auth/logout");
  }
};
</script>
