const express = require('express');
const passport = require("passport")
const jwt = require("jsonwebtoken")
var mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require('../models/user');
const router = require('express').Router();

router.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user) => {
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

router.post('/register', async (req, res) => {
    User.findOne({ name: req.body.name }, async (err, element) => {
        if (err) throw err;
        else if (element) {
            res.send("User already exist");
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const mdp = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: mdp
            })
            newUser.save(user => res.json(user))
            res.send("New User Added")
        }

    });


})

router.get("/auth", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send(req.user);
})

module.exports = router;