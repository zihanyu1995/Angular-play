// server.js
const express = require('express');

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({ secret: "yzh95" }));
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
// app.use(function (req,res,next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
// });
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});
require("./assignment/app")(app);

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
