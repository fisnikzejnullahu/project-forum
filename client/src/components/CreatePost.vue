<template>
  <div class="container mt-5">
    <div>
      <div class="row ml-2">
        <h3>Ask a Question</h3>
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
                <input type="text" placeholder="Title" v-model.trim="title" class="form-control">
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
                  v-model.trim="description"
                  class="form-control"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="btn-toolbar float-right">
            <div class="btn-group">
              <button type="submit" class="btn btn-primary" @click="addPost">ASK</button>
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
  name: "create-post",
  data() {
    return {
      title: "",
      description: "",
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
  //   mounted() {
  //     if (this.user) {
  //       this.$router.push("/");
  //     }
  //   },
  methods: {
    async addPost() {
      if (this.title.length === 0) {
        this.validationError = true;
        return false;
      }

      var post = {
        title: this.title,
        description: this.description,
        created_at: new Date(),
        user: this.user.username,
        category: "Vue",
        votes: 0
      };

      var result = await this.$store.dispatch("posts/addPost", post);
      console.log(result);

      if (!result.success) {
        this.apiError = true;
        this.apiMsg = result.message;
      } else {
        this.$router.push({ name: "post", params: { id: result.post._id } });
      }
    }
  }
};
</script>
