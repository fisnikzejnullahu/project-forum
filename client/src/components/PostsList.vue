<template>
  <div>
    <div v-if="byCategory.length !== 0" class="row mb-3">
      <div>
        <h4>Posts of category: {{byCategory}}</h4>
      </div>
      <div class="ml-3">
        <button class="btn btn-dark" @click="clearSearches">reset searches</button>
      </div>
    </div>
    <div class="row">
      <div v-if="filteredList.length === 0">
        <h3>No post was found!</h3>
      </div>
      <div v-else v-for="post in filteredList" :key="post._id" class="col-lg-4 col-md-6">
        <div class="card h-100 post-card">
          <router-link :to="{name: 'post', params: {id: post._id}}" class="post-link">
            <div class="single-post post-style-2 post-style-3">
              <div class="blog-info">
                <h6 class="pre-title">
                  <router-link
                    :to="{name: 'category', params: {id: post.category}}"
                  >{{post.category}}</router-link>
                </h6>
                <h4 class="title">
                  <b>{{titleFormat(post.title)}}</b>
                </h4>
                <div class="mb-3">
                  <h6 href="#" class="date">asked {{createdAtFormat(post.created_at)}}</h6>
                  <i>
                    <h6 class="date">- by {{post.user}}</h6>
                  </i>
                </div>
                <ul class="post-footer">
                  <li>
                    <a href="#">{{post.votes}} votes</a>
                  </li>
                </ul>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Api from "@/API";

export default {
  name: "post-list",
  data() {
    return {
      byCategory: ""
    };
  },
  created() {
    if (this.$route.query.category) {
      this.byCategory = this.$route.query.category;
    }
  },
  methods: {
    createdAtFormat: function(createdAt) {
      var now = new Date().getTime();
      var date = new Date(createdAt).getTime();

      const diffTime = Math.abs(now - date);
      const diffSeconds = Math.ceil(diffTime / 1000);

      if (diffSeconds > 1) {
        const diffMinutes = Math.ceil(diffTime / (1000 * 60));

        if (diffMinutes >= 60) {
          const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
          if (diffHours >= 24) {
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 6) {
              return " on " + createdAt;
            }
            return diffDays + " days ago";
          }
          return diffHours + " hours ago";
        }
        return diffMinutes + " minutes ago";
      }
      return "a few seconds ago";
    },
    titleFormat(title) {
      if (title.length > 29) {
        return title.substring(0, 26) + "...";
      }
      return title;
    },
    clearSearches() {
      this.byCategory = "";
      this.$store.dispatch("posts/searchByCategory", "");
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters("posts", ["filteredList"])
  }
};
</script>

<style>
.post-card {
  transition: transform 0.5s ease;
  cursor: pointer;
}
.post-card:hover {
  transform: scale(1.05);
}

.pre-title {
  color: #1565c0;
}

.post-footer i,
.post-footer i:hover {
  color: #000;
}

.post-link:hover {
  color: #000;
}

.single-post .post-footer > li {
  width: 100%;
}

.single-post .post-footer > li a:hover {
  color: #000;
}

#resetSearch {
  font-style: italic;
  color: #1565c0;
}
</style>
