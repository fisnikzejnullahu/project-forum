<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <form class="form-horizontal" role="form" @submit.prevent="onSubmit">
          <div class="row mt-5">
            <div class="col-md-6">
              <h2>Login</h2>
              <hr>
            </div>
          </div>
          <div>
            <p class="text-danger mb-4" v-show="apiError">{{apiMsg}}</p>
          </div>
          <div class="row">
            <div class="col-md-2 field-label-responsive">
              <label for="username">Username</label>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                  <input
                    v-model="username"
                    type="text"
                    name="username"
                    class="form-control"
                    id="username"
                    placeholder="username"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2 field-label-responsive">
              <label for="password">Password</label>
            </div>
            <div class="col-md-4">
              <div class="form-group has-danger">
                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                  <input
                    v-model="password"
                    type="password"
                    name="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-4">
              <button type="submit" class="btn btn-primary btn-block mylog">
                <i class="fa fa-user-plus"></i> Login
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-4 mt-3">
              <span>Don't have an account?</span>
              <router-link to="/signup" class="ml-2" style="color:#498BF9">
                <span>Signup now...</span>
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/API";
import { mapState } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      apiError: false,
      apiMsg: ""
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  mounted() {
    if (this.user) {
      this.$router.push("/");
    }
  },
  methods: {
    async onSubmit() {
      var user = {
        username: this.username,
        password: this.password
      };

      var result = await this.$store.dispatch("auth/login", user);
      console.log(result);
      if (result.success === false) {
        this.apiMsg = result.message;
        this.apiError = true;
      } else {
        localStorage.token = result.token;
        this.$router.push("/");
      }
    }
  }
};
</script>

<style>
.mylog {
  background-color: #498bf9 !important;
  color: #fff;
  cursor: pointer;
}
</style>
