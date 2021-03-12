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


// // middleware that allows the react server and the backend server to exchange information, can be removed or commented out when in production
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });


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
