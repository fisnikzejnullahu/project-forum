<template>
  <div class="col-lg-4 col-md-12 no-left-padding">
    <div class="single-post info-area">
      <div class="tag-area">
        <h4 class="title">
          <b>BROWSE CATEGORIES</b>
        </h4>
        <ul>
          <li v-for="category in categories" :key="category._id">
            <router-link :to="{name: 'category', params: {id: category.name}}">{{category.name}}</router-link>
            <!-- <a href="#">{{category.id}}</a> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      categories: state => state.categories.all
    })
  },
  mounted() {
    console.log(this.categories);
  }
};
</script>