const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const axios = require("axios");

router.use("/api", apiRoutes);

router.get('/logout', function (req, res){
  console.log("logging out????")
  req.session.destroy(function (err) {
    res.send("byebye");
  });
});

if (process.env.NODE_ENV === "production") {
    // router.use(express.static(path.join(__dirname, 'client/build')));
    router.use( (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
  }

module.exports = router;