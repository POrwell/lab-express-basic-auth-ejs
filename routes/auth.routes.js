const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const app = require('../app')
const User = require('../models/User.model')
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

router.get("/signup", isLoggedOut, (req, res) => {
    res.render("auth/signup")
    console.log("success")
})

router.post("/signup", async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        await User.create({
            username: req.body.username,
            password: hashedPassword
        })
        res.redirect("/auth/login")
    } catch (error) {
        console.log(error.message)
        res.render("auth/signup", { errorMessage: error.message })
    }
})

router.get("/login", isLoggedOut, (req, res) => {
    res.render("auth/login")
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    const currentUser = await User.findOne({ username })
    try{if (!currentUser) {
        res.render("auth/login", { errorMessage: 'No user with this username' })
    }
    else {
        if (bcrypt.compareSync(password, currentUser.password)) {
            req.session.user = currentUser
            res.redirect('/profile')
        } else {
            res.render('auth/login', { errorMessage: 'Password is incorrect' })
        }
    }}
    catch(error){
        console.log(error)
    }
})

router.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        next(err)
      }
      res.redirect('/auth/login')
    })
  })
  
module.exports = router