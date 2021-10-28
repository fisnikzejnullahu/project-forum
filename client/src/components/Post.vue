<template>
  <div>
    <section class="post-area section">
      <div class="container">
        <div class="row">
          <!-- <div class="col-md-2"></div> -->
          <div class="col-lg-8 col-md-12 no-right-padding">
            <div class="main-post">
              <div class="blog-post-inner">
                <div class="row align-items-center">
                  <div class="col-md-10">
                    <div class="post-info">
                      <div class="left">
                        <a class="name" href="#">
                          <!-- {{findById}} -->
                          <b>Asked by: {{post.user}}</b>
                        </a>
                        <h6 class="date ml-1">on {{post.created_at}}</h6>
                      </div>
                    </div>
                  </div>
                  <div v-show="hasPermissions">
                    <button type="button" class="btn btn-danger btn-remove" @click="deletePost">
                      <i class="ion-close"></i>
                    </button>
                    <router-link
                      :to="{name: 'edit-post', params: {id: post._id}}"
                      class="btn btn-success ml-1"
                    >
                      <i class="ion-edit"></i>
                    </router-link>
                  </div>
                </div>
                <!-- post-info -->

                <div class="row">
                  <div class="col-md-1">
                    <div>
                      <i class="ion-arrow-up-a vote" @click="voteUp"></i>
                      <br>
                      <span class="ml-2">{{votes}}</span>
                      <br>
                      <i class="ion-arrow-down-a vote" @click="voteDown"></i>
                    </div>
                  </div>
                  <div class="col-md-11">
                    <div>
                      <h3 class="title">
                        <b>{{post.title}}</b>
                      </h3>

                      <p class="para">{{post.description}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- blog-post-inner -->

              <!-- <div class="post-icons-area">
                <ul class="post-icons">
                  <li>
                    <a href="#">
                      <i class="ion-heart my-font"></i>57
                    </a>
                  </li>
                </ul>
              </div>-->
            </div>
          </div>

          <category-list/>
        </div>
      </div>
    </section>

    <comment-section/>
  </div>
  <!-- post-area -->
</template>

<script>
import PostCommentSection from "./PostCommentSection";
import PostCategorySection from "./PostCategorySection";
import Api from "@/API";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Post",
  data() {
    return {
      post: {},
      votes: 0
    };
  },
  components: {
    "comment-section": PostCommentSection,
    "category-list": PostCategorySection
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    // ...mapGetters({
    //   getById: "posts/getById"
    // }),
    findById() {
      console.log(
        "/////////////////////////////////////////////////////////////////////"
      );

      var res = this.$store.getters["posts/getById"](this.$route.params.id);
      console.log(res);
      console.log(
        "/////////////////////////////////////////////////////////////////////"
      );

      // var res = this.$store.getters.posts.getById(this.$route.params.id);
      // console.log(res);

      return "this.getById[this.$route.params.id]";
    }
    // thing() {
    //   console.log("thing");
    //   console.log(this.$store);

    //   var asd = this.$store.getters("posts/getById", this.$route.params.id);
    //   console.log(asd);

    //   return asd;
    // }
  },
  async created() {
    var result = await Api.get("posts", this.$route.params.id);
    // // var result = await Api.get("posts", this.$route.params.id);
    // console.log("44444444444444444444444444444444");
    // console.log(result);
    this.post = result.post;
    // console.log("44444444444444444444444444444444");

    var cats = [
      "Java",
      "Javascript",
      "Nodejs",
      "Vuejs",
      "C#",
      "Android",
      "React",
      "React-Native"
    ];

    var nows = cats.map(cat => {
      return {
        id: cat,
        description: "Programming..."
      };
    });

    // nows.forEach(c => {
    //   Api.create("categories", c);
    // });

    this.$store.dispatch("categories/fetchCategories");
  },
  methods: {
    async voteUp() {
      var result = await this.$store.dispatch(
        "posts/voteUp",
        this.$route.params.id
      );

      if (result.success) {
        this.votes++;
      }
    },

    async voteDown() {
      var result = await this.$store.dispatch(
        "posts/voteDown",
        this.$route.params.id
      );

      if (result.success) {
        this.votes--;
      }
    },
    async deletePost() {
      var confirmed = confirm("Are you sure you want to delete this post?");
      if (confirmed) {
        var result = await this.$store.dispatch(
          "posts/deletePost",
          this.post._id
        );
        if (result.success) {
          this.$router.push("/");
        }
      }
    },
    ownerOfPost() {
      return this.user.username === this.post.user;
    },
    hasPermissions() {
      return this.user && (ownerOfPost() || this.user.role === "Admin");
    }
  }
};
</script>

<style>
@import "../assets/bona/single-post-1/css/styles.css";
@import "../assets/bona/single-post-1/css/responsive.css";

.vote {
  font-size: 35px !important;
  color: #bdbdbd;
  cursor: pointer;
}

.btn-remove {
  cursor: pointer;
}

.btn-remove:focus {
  color: #fff;
}
</style>


