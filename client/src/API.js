var BASE_URL = "http://localhost:3000";
var API_URL = `${BASE_URL}/api`;

// export default API_URL;

// GET = async resource => {
//   const response = await fetch(`${API_URL}/${resource}`);
//   return response.json();
// };
async function callApi(resource, object, httpMethod) {
  console.log("CALLED API from /" + resource);

  const response = await fetch(`${API_URL}/${resource}`, {
    method: httpMethod,
    body: object ? JSON.stringify(object) : null,
    headers: {
      "content-type": "application/json",
      authorization: `${localStorage.token}`
    }
  });

  return response.json();
}

export default {
  async all(resource) {
    return await callApi(resource, null, "GET");
  },

  async get(resource, objectId) {
    return await callApi(`${resource}/${objectId}`, null, "GET");
  },

  async create(resource, object) {
    return await callApi(resource, object, "POST");
  },

  async edit(resource, objectId, object) {
    return await callApi(`${resource}/${objectId}`, object, "PUT");
  },

  async delete(resource, objectId) {
    return await callApi(`${resource}/${objectId}`, null, "DELETE");
  },

  async signup(user) {
    return await callApi(`auth/signup`, user, "POST");
  },

  async login(user) {
    return await callApi(`auth/login`, user, "POST");
  },

  async getCommentsOfPost(postId) {
    return await callApi("comments/post/" + postId, null, "GET");
  },

  async deleteCommentOfPost(commentId) {
    return await callApi("comments/post/" + postId, null, "GET");
  },

  async votePostUp(postId) {
    return await callApi("posts/vote/" + postId, { type: "UP" }, "PUT");
  },

  async votePostDown(postId) {
    return await callApi("posts/vote/" + postId, { type: "DOWN" }, "PUT");
  },

  async deleteAll() {
    var response = await fetch(`${API_URL}/posts/del`);
    return response.json();
  }
};
