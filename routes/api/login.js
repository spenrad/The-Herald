const router = require("express").Router();
const passport = require('passport')

// NOTE: could not modularize the login route further than this (by passing it to the controller)
// authentication had to be done directly on the route as below
router
  .post('/', passport.authenticate('local'), function(req, res) {
      // console.log('logging in:', req.user)
      res.json(req.user);
  });
 
module.exports = router;