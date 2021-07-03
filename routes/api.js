const express = require('express');
const passport = require("passport");
const jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require('../models/user');
const router = require('express').Router();
const email = require('../email.js');

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
    User.findOne({ email: req.body.email }, async (err, element) => {
        // console.log(element.email)
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        else if (element) {
            console.log(element)
            res.send("Email Already Exist!");
        }
        else {
            User.findOne({ name: req.body.name }, async (err, element2) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                else if (element2) {
                    res.send("Username Already Exist!");
                }
                else {
                    const salt = await bcrypt.genSalt(10);
                    const mdp = await bcrypt.hash(req.body.password, salt);
                    const token = jwt.sign({ email: req.body.email }, "hard_token_men")
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: mdp,
                        confirmationCode: token
                    })
                    newUser.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({
                            message:
                                "User was registered successfully! Please check your email",
                        });
                        email.sendConfirmationEmail(
                            newUser.name,
                            newUser.email,
                            newUser.confirmationCode
                        );
                    });
                }
            });


        }
    })
})

router.get("/auth", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send(req.user);
})

router.post("/changeUsername", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(err);
            console.log("bonsoir")
            res.sendStatus(500);
            return;
        }
        if (!user) {
            res.json('Didn\'t found the user!');
            return;
        }
        else {
            user.name = req.body.newUsername;
            user.save(function (err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                res.json('Done');
            });
        }
    })
})

module.exports = router;