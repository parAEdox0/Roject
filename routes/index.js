var express = require('express');
var router = express.Router();
var userModel = require("./users");
const passport = require('passport');
const localStrategy = require("passport-local").Strategy;
passport.authenticate(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function (req, res) {
  res.render("index");
});

// router.get('/main', isLoggedIn, function (req, res) {
//   res.send("Main page")
// })

router.post('/register', function (req, res) {
  res.render("register");
  // const userData = new userModel({
  //   name: req.body.name,
  //   email: req.body.email,
  //   username: req.body.username
  // });

  // userModel.register(userData, req.body.password)
  //   .then(function () {
  //     passport.authenticate("local")(req, res, function () {
  //       res.redirect("/main");
  //     });
  //   })
});

router.post('/login', function (req, res) {
  res.render("login")
})

// router.get('/logout', function (req, res) {
//   req.logout(function (err) {
//     if (err) { return next(err); }
//     res.redirect('/')
//   })
// })

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/")
// }

module.exports = router;
