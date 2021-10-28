import Api from "@/API";

const state = {
  all: [],
  searchQuery: "",
  byCategory: "",
  pageIndex: 1
};

const mutations = {
  setPosts(state, posts) {
    state.all = posts;
  },
  pushPost(state, post) {
    state.all.splice(0, 0, post);
  },
  popPost(state, postId) {
    state.all.forEach(post => {
      if (post.id === postId) {
        state.all.pop(post);
      }
    });
  },
  editPost(state, postId, newPost) {
    state.all.forEach((post, index) => {
      if (post.id === postId) {
        post = newPost;
      }
    });
  },
  search(state, query) {
    state.searchQuery = query;
  },
  searchByCategory(state, cat) {
    console.log("SEARCH BY CATEGORY");
    console.log(cat);

    state.byCategory = cat;
  },
  changePageIndex(state, idx) {
    state.pageIndex = idx;
  }
};

const actions = {
  async fetchPosts({ commit }, pageIndex) {
    var result = await Api.all("posts");
    if (result.success) {
      commit("setPosts", result.posts);
      commit("changePageIndex", pageIndex);
    }
  },
  async addPost({ commit }, post) {
    console.log("ADD POST ACTION ");

    var result = await Api.create("posts", post);
    if (result.success) {
      commit("pushPost", result.post);
    }
    return result;
  },
  async deletePost({ commit }, postId) {
    console.log("DELETE POST ACTIOn " + postId);

    var result = await Api.delete("posts", postId);
    if (result.success) {
      commit("popPost", result.post);
    }
    return result;
  },
  async editPost({ commit }, obj) {
    var result = await Api.edit("posts", obj.postId, obj.newPost);

    if (result.success) {
      commit("editPost", result.post);
    }
    return result;
  },
  async voteUp({ commit }, postId) {
    var result = await Api.votePostUp(postId);
    if (result.success) {
      console.log("VOTEUP");
      console.log(result.post);

      commit("editPost", result.post);
    }
    return result;
  },
  async voteDown({ commit }, postId) {
    var result = await Api.votePostDown(postId);
    if (result.success) {
      commit("editPost", result.post);
    }
    return result;
  },
  async search({ commit }, searchQuery) {
    commit("search", searchQuery);
  },
  async searchByCategory({ commit }, categ) {
    commit("searchByCategory", categ);
  }
};

const getters = {
  filteredList() {
    if (state.byCategory !== "") {
      return state.all.filter(post => {
        return (
          post.title.toLowerCase().includes(state.searchQuery.toLowerCase()) &&
          post.category.toLowerCase() === state.byCategory.toLowerCase()
        );
      });
    } else {
      return state.all.filter(post => {
        return post.title
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());
      });
    }
  },
  getById: state => id => state.all.find(post => post.id === id)
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
