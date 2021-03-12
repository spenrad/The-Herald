const router = require("express").Router();
const axios = require("axios");

router.post("/", function (req, res) {
    axios
      .get("https://newsapi.org/v2/everything?qInTitle=" +req.body.search + req.body.date + "&language=en&sortBy=popularity&apiKey=df5325c355274b608c24ce203beb33ce"
      )
      .then((info) => {
        console.log("articles", info.data);
        let articles = info.data;
        res.json(articles);
      });
});

module.exports = router;
