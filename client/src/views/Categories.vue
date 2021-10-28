<template>
  <div class="container">
    <create-category v-if="user && user.role === 'Admin'"/>
    <div class="row mt-3">
      <h3 class="mb-2 ml-2">Categories:</h3>
      <div class="col-md-12 category-item mt-2" v-for="category in categories" :key="category._id">
        <p class="float-left">
          <router-link :to="{name: 'category', params: {id: category.name}}">{{category.name}}</router-link>
        </p>

        <router-link
          :to="{name: 'edit-category', params: {id: category._id}}"
          v-show="user && user.role === 'Admin'"
          class="btn btn-success float-right ml-1"
        >
          <i class="ion-edit"></i>EDIT
        </router-link>
        <button
          v-if="user && user.role === 'Admin'"
          type="button"
          class="btn btn-danger btn-remove float-right"
          @click="deleteCategory(category._id)"
        >
          <i class="ion-close"></i> DELETE
        </button>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import Api from "@/API";
import CreateCategory from "@/components/CreateCategory";
import { mapState } from "vuex";
export default {
  name: "categories",
  components: {
    "create-category": CreateCategory
  },
  created() {
    this.$store.dispatch("categories/fetchCategories");
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      categories: state => state.categories.all
    })
  },
  methods: {
    async deleteCategory(id) {
      var confirmed = confirm("Are you sure you want to delete this category?");
      if (confirmed) {
        var result = await this.$store.dispatch(
          "categories/deleteCategory",
          id
        );

        console.log(result);

        // if (result.success) {
        //   for (let i = 0; i < this.comments.length; i++) {
        //     let comment = this.comments[i];

        //     if (comment._id == id) {
        //       this.comments.pop(comment);
        //     }
        //   }
        // }
      }
    }
  }
};
</script>

<style>
.category-item {
  background-color: #fff !important;
  padding: 15px;
}

.category-item p {
  font-size: 19px;
}

.category-item button {
  font-size: 15px;
}
</style>
