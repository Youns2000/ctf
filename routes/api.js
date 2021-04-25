const express = require('express');
const passport = require("passport")
const jwt = require("jsonwebtoken")
var mongoose = require('mongoose');
var crypto = require('crypto');
const User = require('../models/user');
const router = require('express').Router();

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.send("Wrong email or password")
        }
        req.login(user, () => {
            const body = { _id: user.id, email: user.email }

            const token = jwt.sign({ user: body }, "hard_token_men")
            return res.json({ token })
        })
    })(req, res, next)
})

router.post('/register', (req, res) => {
    // const salt = crypto.randomBytes(16).toString('hex');
    // const hash = crypto.pbkdf2Sync(req.body.password, salt,
    //     1000, 64, `sha512`).toString(`hex`);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    newUser.save(user => res.json(user))

})

router.get("/secret", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (!req.user) {
        res.json({
            username: "nobody"
        })
    } else {
        res.json(req.user)
    }
})

module.exports = router;