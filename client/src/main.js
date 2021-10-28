import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import PostList from "@/components/PostsList";
import store from "@/store";

Vue.config.productionTip = false;

Vue.component("post-list", PostList);

// router.beforeEach((to, from, next) => {
//   console.log(to);

//   if (to.path !== "/login" && !localStorage.token2515) {
//     next("/login");
//   }
//   next(true);
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// require("./assets/bona-theme/css/ionicons.min.css");
