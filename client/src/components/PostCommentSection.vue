<template>
  <section class="comment-section mt-4">
    <div class="container">
      <h4>
        <b>POST COMMENT</b>
        <h5 v-show="!user">
          Please
          <router-link to="/login" class="mr-2" style="color:#498BF9">
            <i>login</i>
          </router-link>to be able to post comment
        </h5>
      </h4>
      <p v-show="error" class="text-danger">Please try again!/p></p>
      <div class="row">
        <div class="col-lg-8 col-md-12">
          <div class="comment-form" v-show="user">
            <div class="row">
              <div class="col-sm-12">
                <textarea
                  name="contact-form-message"
                  rows="2"
                  class="text-area-messge form-control"
                  placeholder="Enter your comment"
                  aria-required="true"
                  aria-invalid="false"
                  v-model="commentContent"
                ></textarea>
              </div>
              <!-- col-sm-12 -->
              <div class="col-sm-12">
                <button class="submit-btn" @click="addComment">
                  <b>POST COMMENT</b>
                </button>
              </div>
            </div>
          </div>

          <h4 class="mt-5">
            <b>COMMENTS ({{comments ? comments.length : 0}})</b>
          </h4>

          <div v-for="comment in comments" :key="comment._id" class="commnets-area">
            <div class="comment">
              <div class="post-info">
                <div class="left">
                  <b>{{comment.user_id}}:</b>
                  <h6 class="date ml-1">on {{comment.created_at}}</h6>
                </div>
                <div class="right-area">
                  <!-- <h5 class="delete-btn"> -->
                  <button
                    class="btn btn-danger-outline delete-btn"
                    v-show="hasPermissions(comment.user_id)"
                    @click="deleteComment(comment._id)"
                  >DELETE</button>
                  <!-- </h5> -->
                </div>
              </div>
              <!-- post-info -->

              <p>{{comment.content}}</p>
            </div>
          </div>

          <b></b>
        </div>
        <b></b>
      </div>
      <b></b>
    </div>
    <!-- container -->
    <b></b>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Api from "@/API";

export default {
  name: "post-comment-section",
  data() {
    return {
      comments: [],
      commentContent: "",
      error: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  async created() {
    var result = await Api.getCommentsOfPost(this.$route.params.id);
    console.log("------------------------------------------");
    console.log(result);

    console.log("------------------------------------------");
    if (result.success) {
      this.comments = result.comments;
    }
  },
  methods: {
    async addComment() {
      var comm = {
        content: this.commentContent,
        user_id: this.user.username,
        post_id: this.$route.params.id,
        created_at: new Date()
      };

      var result = await Api.create("comments", comm);

      if (result.success) {
        this.commentContent = "";
        this.comments.push(result.comment);
      } else {
        this.error = true;
      }
    },
    async deleteComment(id) {
      var confirmed = confirm("Are you sure you want to delete this comment?");
      if (confirmed) {
        var result = await Api.delete("comments", id);

        if (result.success) {
          for (let i = 0; i < this.comments.length; i++) {
            let comment = this.comments[i];

            if (comment._id == id) {
              this.comments.pop(comment);
            }
          }
        }
      }
    },
    ownerOfComment(commentUser) {
      return this.user.username === commentUser;
    },
    hasPermissions(commentUser) {
      return (
        this.user &&
        (this.ownerOfComment(commentUser) || this.user.role === "Admin")
      );
    }
  }
};
</script>


<style>
.delete-btn {
  color: red;
  cursor: pointer;
}
</style>
