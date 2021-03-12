const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.user) {
    res.status(200).json(true);
  }
  else {res.json(false)}
});

module.exports = router;
