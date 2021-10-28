import Api from "@/API";

const state = {
  all: [],
  isLoading: false
};

const mutations = {
  setCategories(state, categories) {
    state.all = categories;
  },
  pushCategory(state, category) {
    state.all.push(category);
  },
  popCategory(state, categoryId) {
    state.all.forEach(category => {
      console.log(category);
      console.log(categoryId);
      if (category._id === categoryId) {
        console.log("U GJET");
        state.all.pop(category);
      }
    });
  },
  editCategory(state, categoryId, newcategory) {
    state.all.forEach(category => {
      if (category.id === categoryId) {
        category = newcategory;
      }
    });
  }
};

const actions = {
  async fetchCategories({ commit }) {
    var result = await Api.all("categories");
    if (result.success) {
      commit("setCategories", result.categories);
    }
  },
  async addCategory({ commit }, category) {
    var result = await Api.create("categories", category);

    if (result.success) {
      commit("pushCategory", result.category);
    }
    return result;
  },
  async deleteCategory({ commit }, categoryId) {
    var result = await Api.delete("categories", categoryId);
    if (result.success) {
      commit("popCategory", categoryId);
    }
    return result;
  },
  async editCategory({ commit }, obj) {
    var result = await Api.edit("categories", obj.categoryId, obj.newCategory);

    if (result.success) {
      commit("editCategory", result.category);
    }
    return result;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
