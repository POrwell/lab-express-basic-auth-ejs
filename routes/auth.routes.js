const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const app = require('../app')
const User = require('../models/User.model')

router.get("/signup", (req, res) => {
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
    console.log(error)
    res.render("auth/signup")
}
})

router.get("/login", (req, res) => {
    res.render("auth/login")
    console.log("success")
})

module.exports = router