import axios from "axios";

export default {
  newsArticles: function (search, date) {
    return axios
      .post("/api/newsArticles", {search, date})
  },

  newsArticlesProfile: function (search, date) {
    return axios.get(
      "https://newsapi.org/v2/everything?qInTitle=" +
        search +
        date +
        "&language=en&sortBy=popularity&apiKey=0e220e65f7324225a3a82a01eef04123"
    );
  },

  // NOTE: axios routes are for development only, add a ternary statement or update once in production
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
