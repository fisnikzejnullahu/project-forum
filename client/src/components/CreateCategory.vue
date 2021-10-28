<template>
  <div class="mt-5">
    <div class="row ml-2">
      <h3>Create new category!</h3>
    </div>
    <div class="row ml-2 mt-2 mb-2">
      <p class="text-danger" v-show="apiError">{{apiMsg}}</p>
    </div>
    <div class="card gedf-card mb-5 clearfix">
      <div class="card-body">
        <div id="myTabContent" class="tab-content">
          <div
            id="posts"
            role="tabpanel"
            aria-labelledby="posts-tab"
            class="tab-pane fade show active"
          >
            <div class="form-group">
              <label for="message" class="sr-only">post</label>
              <input
                type="text"
                placeholder="Category name"
                v-model.trim="category.name"
                class="form-control"
              >
              <p class="text-danger float-left mb-2 ml-2" v-show="validationError">Name is required!</p>
            </div>

            <div class="form-group">
              <label for="message" class="sr-only">post</label>
              <textarea
                id="message"
                rows="3"
                placeholder="Description"
                v-model.trim="category.description"
                class="form-control"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="btn-toolbar float-right">
          <div class="btn-group">
            <button type="submit" class="btn btn-primary" @click="addCategory">CREATE</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Api from "@/API";
export default {
  name: "create-post",
  data() {
    return {
      category: {
        name: "",
        description: ""
      },
      apiError: false,
      apiMsg: false,
      validationError: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    async addCategory() {
      this.validationError = false;
      if (this.category.name.length === 0) {
        this.validationError = true;
        return false;
      }

      var result = await this.$store.dispatch(
        "categories/addCategory",
        this.category
      );
      console.log(result);

      if (!result.success) {
        this.apiError = true;
        this.apiMsg = result.message;
      } else {
        console.log("SHKOJ");

        this.category.name = "";
        this.category.description = "";
      }
    }
  }
};
</script>
