<template>
  <header>
    <div class="container-fluid position-relative no-side-padding">
      <a href="#" class="logo">
        <img src="images/logo.png" alt="Logo Image">
        <!-- <h3>Forum</h3> -->
      </a>

      <div class="menu-nav-icon" data-nav-menu="#main-menu">
        <i class="ion-navicon"></i>
      </div>

      <ul class="main-menu visible-on-click" id="main-menu">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/categories">Categories</router-link>
        </li>
      </ul>

      <div class="src-area">
        <form v-on:submit.prevent="search">
          <button class="src-btn" type="submit">
            <i class="ion-ios-search-strong"></i>
          </button>
          <input class="src-input" type="text" placeholder="Search..." v-model="searchHint">
        </form>
      </div>

      <ul class="main-menu" style="float:right;" id="main-menu" v-if="user">
        <li>
          <router-link to="/" id="my-profile">
            <i class="ion-ios-contact"></i>
            {{user.username}}
          </router-link>
        </li>
        <li>
          <router-link to="/logout" id="logout-btn">Logout</router-link>
        </li>
      </ul>
      <ul class="main-menu" style="float:right;" id="main-menu" v-else>
        <li>
          <router-link to="/login" id="logout-btn">Login</router-link>
        </li>
        <li>
          <router-link to="/signup" id="signup-btn">Signup</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      searchHint: ""
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
    search() {
      this.$router.push("/");
      this.$store.dispatch("posts/search", this.searchHint);
      console.log("SEARCHED " + this.searchHint);
    }
  }
};
</script>

<style>
header .src-area {
  float: left !important;
}

#my-profile:hover {
  background-color: inherit;
  color: inherit;
}

#logout-btn {
  background-color: #000;
  color: #fff;
  text-transform: uppercase;
}

#signup-btn {
  background-color: #0275d8;
  color: #fff;
  text-transform: uppercase;
}
</style>
