import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Post from "./components/Post.vue";
import EditPost from "./components/EditPost.vue";
import CreatePost from "./components/CreatePost.vue";
import Categories from "./views/Categories.vue";
import Category from "./components/Category.vue";
import EditCategory from "./components/EditCategory.vue";
import Logout from "./views/Logout.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/Signup.vue")
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/post/:id",
      name: "post",
      component: Post
    },
    {
      path: "/edit-post/:id",
      name: "edit-post",
      component: EditPost
    },
    {
      path: "/create-post",
      name: "create-post",
      component: CreatePost
    },
    {
      path: "/categories",
      name: "categories",
      component: Categories
    },
    {
      path: "/category/:id",
      name: "category",
      component: Category
    },
    {
      path: "/edit-category/:id",
      name: "edit-category",
      component: EditCategory
    }
  ]
});
