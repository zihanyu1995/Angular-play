var UserModel = require('../model/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

function serializeUser(user, done) {
  done(null, user);
}

function deserializeUser(user, done) {
  UserModel.findUserById(user._id)
    .then(
      function(user){
        done(null, user);
      },function(err){
        done(err, null);
      }
    );
}

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new LocalStrategy(localStrategy));

function localStrategy(username, password, done) {
  UserModel.findUserByUsername(username)
    .then(
      function(user) {
        if (user && user.username === username && bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          console.log("no");
          return done(null, false);
        }
      },
      function(err) {
        if (err) {
          console.log(err);
          return done(err); }
      }
    );
}

module.exports = function(app) {


  //var bodyParser = require('body-parser');
  app.get('/api/user', findUser);
  app.post('/api/user',createUser);
  app.get('/api/user/:userId', findUserById);
  app.delete('/api/user/:userId', deleteUser);
  app.put('/api/user/:userId', updateUser);
  app.post ('/api/login', passport.authenticate('local'),login);
  app.post('/api/logout', logout );
  app.post ('/api/register', register);
  app.get ('/api/loggedin', loggedin);

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function register (req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    UserModel.createUser(user).then(
      function(user){
        if(user){
          req.login(user, function(err) {
            if(err) {res.status(400).send(err);
            } else {
              res.json(user);
            }
          });
        }
      }
    );
  }

  function login (req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout (req, res){
    req.logOut();
    res.status(200).send();
  }

  function createUser (req, res) {
    var user = new Object();
    user.username = req.body.username;
    user.password = req.body.password;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = bcrypt.hashSync(user.password);
    res.status(200).send(UserModel.createUser(user));


  }

  function findUserById(req,res) {
    var userId = req.params['userId'];
    UserModel.findUserById(userId).then(
      function (data) {
        console.log(data);
        res.status(200).send(data);
      }
    );

  }

  function  findUser(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if(username && !password)
    {
      UserModel.findUserByUsername(username).then(
        function (data) {
          console.log(data);
          res.status(200).send(data);
        }
      );
    }
    else
    if(username && password)
    {
      UserModel.findUserByCreadentials(username,password).then(
        function (data) {
          console.log(data);
          res.status(200).send(data);
        }
      );
    }
  }

  function deleteUser(req,res) {

    UserModel.deleteUser(req.params['userId']).then(
      function (data) {
        console.log(data+'000');
        res.status(200).send();
      }
    );

  }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    UserModel.updateUser(userId,req.body).then(
      function (data) {
        console.log(data);
        if(data)
          res.status(200).send(data);
        else
          res.status(500).send();
      }
    );


  }


};



