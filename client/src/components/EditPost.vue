<template>
  <div class="container mt-5">
    <div>
      <div class="row ml-2">
        <h3>Edit Post</h3>
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
                  placeholder="Title"
                  v-model.trim="post.title"
                  class="form-control"
                >
                <p
                  class="text-danger float-left mb-2 ml-2"
                  v-show="validationError"
                >Title is required!</p>
              </div>

              <div class="form-group">
                <label for="message" class="sr-only">post</label>
                <textarea
                  id="message"
                  rows="3"
                  placeholder="Description"
                  v-model.trim="post.description"
                  class="form-control"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="btn-toolbar float-right">
            <div class="btn-group">
              <button type="submit" class="btn btn-success" @click="editPost">EDIT</button>
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
  name: "edit-post",
  data() {
    return {
      post: {},
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
  mounted() {
    var hasPer = false;
    if (this.user) {
      if (this.user.role !== "Admin" && !this.ownerOfPost()) {
        this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
  },
  async created() {
    var result = await Api.get("posts", this.$route.params.id);
    console.log(result);
    this.post = result.post;
    console.log(this.post);
  },
  methods: {
    async editPost() {
      if (this.post.title.length === 0) {
        this.validationError = true;
        return false;
      }

      var result = await this.$store.dispatch("posts/editPost", {
        postId: this.$route.params.id,
        newPost: this.post
      });

      if (!result.success) {
        this.apiError = true;
        this.apiMsg = result.message;
      } else {
        this.$router.push({ name: "post", params: { id: this.post._id } });
      }
    },
    ownerOfPost() {
      return this.user.username === this.post.user;
    }
  }
};
</script>
