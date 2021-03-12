const router = require("express").Router();
const axios = require("axios");

router
.get('/', function (req, res) {
     axios.get("https://newsapi.org/v2/everything?qInTitle=" + search + date + "&language=en&sortBy=popularity&apiKey=df5325c355274b608c24ce203beb33ce").then( (info)=> {
      console.log("articles", info.data);
      let articles =info.data
      res.json(articles)
      })
    })
    

module.exports = router;
