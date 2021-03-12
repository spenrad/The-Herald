import axios from "axios";

export default {
  
  newsArticles: function (search, date) {
    return axios
      .post("/api/newsArticles", {search, date})
  },

  newsArticlesProfile: function (search) {
    return axios
      .post("/api/newsArticlesProfile", {search})
  },

  registerUser: function (info) {
    return axios.post("/api/signup", info);
  },

  loginUser: function (info) {
    return axios.post("/api/login", info, {
      withCredentials: true,
    });
  },

  updateTopic: function (info) {
    return axios.put("/api/update", info, {
      withCredentials: true,
    });
  },

  authUser: function () {
    return axios.get("/api/checkAuthentication", {
      withCredentials: true,
    });
  },

  getUserInfo: function () {
    return axios.get("/api/userTopics", {
      withCredentials: true,
    });
  },

  logoutUser: function () {
    return axios.get("/logout", {
      withCredentials: true,
    });
  },
};
