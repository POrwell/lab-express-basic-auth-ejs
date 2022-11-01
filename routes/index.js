const express = require("express")
const router = require("express").Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", {user: req.session.user})
})

router.get("/main", isLoggedIn, (req, res) => {
  res.render("main");
})

router.get("/private", isLoggedIn, (req, res) => {
  res.render("private")
})

module.exports = router;
