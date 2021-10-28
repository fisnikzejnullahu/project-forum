<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <form class="form-horizontal" role="form" @submit.prevent="onSubmit">
          <div class="row mt-5">
            <div class="col-md-6">
              <h2>Create your forum account</h2>
              <hr>
            </div>
          </div>
          <div>
            <strong>
              <p class="text-success" v-show="submitted && !apiError">{{apiMsg}}</p>
            </strong>
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
            <div class="col-md-2" v-show="submitted && !username">
              <div class="form-control-feedback">
                <span class="text-danger align-middle">{{usernameError}}</span>
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
            <div class="col-md-2" v-show="submitted && !password">
              <div class="form-control-feedback">
                <span class="text-danger align-middle">{{pwError}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-4">
              <button type="submit" class="btn btn-secondary btn-block">
                <i class="fa fa-user-plus"></i> Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/API";

export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      apiError: false,
      apiMsg: "",
      usernameError: "Username is required",
      pwError: "Password is required"
    };
  },
  methods: {
    async onSubmit() {
      this.submitted = true;
      var user = {
        username: this.username,
        password: this.password,
        role: "User"
      };

      if (user.username !== "" && user.password !== "") {
        var result = await Api.signup(user);
        console.log(result);
        if (result.success === false) {
          console.log("*********************************************");

          this.apiMsg = result.msg;
          this.apiError = true;
        } else {
          this.apiMsg = "Register success! Redirecting to login page...";
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);
        }
      }
    }
  }
};
</script>
