const router = require("express").Router();
const axios = require("axios");

router.post("/", function (req, res) {
    axios
      .get("https://newsapi.org/v2/everything?qInTitle=" + req.body.search + "&language=en&sortBy=popularity&apiKey=df5325c355274b608c24ce203beb33ce"
      )
      .then((info) => {
        let articles = info.data;
        res.json(articles);
      });
});

module.exports = router;