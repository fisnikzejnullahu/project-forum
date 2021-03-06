import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import posts from "./modules/posts";
import categories from "./modules/categories";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    posts,
    categories
  }
});
