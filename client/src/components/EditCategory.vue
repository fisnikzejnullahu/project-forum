<template>
  <div class="container mt-5">
    <div class="mt-5">
      <div class="row ml-2">
        <h3>Edit category!</h3>
      </div>
      <div class="row ml-2 mt-2 mb-2">
        <p class="text-danger" v-show="apiError">{{apiMsg}}</p>
      </div>
      <div class="card gedf-card mb-5 clearfix">
        <div class="card-body">
          <div id="myTabContent" class="tab-content">
            <div
              id="categorys"
              role="tabpanel"
              aria-labelledby="categorys-tab"
              class="tab-pane fade show active"
            >
              <div class="form-group">
                <label for="message" class="sr-only">category</label>
                <input
                  type="text"
                  placeholder="Category name"
                  v-model.trim="category.name"
                  class="form-control"
                >
                <p
                  class="text-danger float-left mb-2 ml-2"
                  v-show="validationError"
                >Name is required!</p>
              </div>

              <div class="form-group">
                <label for="message" class="sr-only">category</label>
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
              <button type="submit" class="btn btn-success" @click="editCategory">EDIT</button>
            </div>
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
  name: "edit-category",
  data() {
    return {
      category: {},
      apiError: false,
      apiMsg: false,
      validationError: false
    };
  },
  async created() {
    var result = await Api.get("categories", this.$route.params.id);
    console.log(result);

    this.category = result.category;
  },
  mounted() {
    if (!this.user || this.user.role !== "Admin") {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    async editCategory() {
      if (this.category.name.length === 0) {
        this.validationError = true;
        return false;
      }

      var result = await this.$store.dispatch("categories/editCategory", {
        categoryId: this.$route.params.id,
        newCategory: this.category
      });

      if (!result.success) {
        this.apiError = true;
        this.apiMsg = result.message;
      } else {
        this.$router.push({
          name: "categories"
        });
      }
    }
  }
};
</script>
