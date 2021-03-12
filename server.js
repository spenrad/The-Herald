const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");

const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.set('useFindAndModify', false);

app.use(express.static("public"));

app.use(session({ secret: "geoknower", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/worldinfo");

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
