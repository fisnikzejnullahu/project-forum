<template>
  <section class="blog-area section">
    <div class="container">
      <div class="row justify-content-end mr-3 mb-3">
        <router-link
          v-if="user"
          :to="{name: 'create-post'}"
          class="btn btn-primary ml-1"
        >ASK A QUESTION</router-link>
      </div>

      <post-list/>
    </div>
  </section>
</template>

<script>
import CreatePost from "@/components/CreatePost";
import Api from "@/API";
import { mapState, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      pageIndex: 1
    };
  },
  components: {
    "create-post": CreatePost
  },
  created() {
    this.$store.dispatch("posts/fetchPosts", this.pageIndex);
    console.log("SEARCHED " + this.$route.query.category);
    if (this.$route.query.category) {
      this.$store.dispatch(
        "posts/searchByCategory",
        this.$route.query.category
      );
    } else {
      this.$store.dispatch("posts/searchByCategory", "");
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.all,
      user: state => state.auth.user
    })
  }
};
</script>