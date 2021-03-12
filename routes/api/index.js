const router = require("express").Router();
const signupRoutes = require("./signup");
const loginRoutes = require("./login");
const updateRoutes = require ("./update");
const authRoutes = require ("./auth");
const topicRoutes = require ("./userTopics")
const articleRoutes = require ("./newsArticles")


router.use("/signup", signupRoutes)
router.use("/login", loginRoutes)
router.use("/update", updateRoutes)
router.use("/checkAuthentication", authRoutes)
router.use("/userTopics", topicRoutes)
router.use("/newsArticles", articleRoutes)



module.exports = router;
