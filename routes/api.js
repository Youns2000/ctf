const express = require('express');
const passport = require("passport");
const jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require('../models/user');
const Challenge = require('../models/challenge');
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
                        email.sendConfirmationEmail(
                            newUser.name,
                            newUser.email,
                            newUser.confirmationCode
                        );
                        res.send({
                            message:
                                "User was registered successfully! Please check your email",
                        });

                    });
                }
            });


        }
    })
})

router.get("/auth", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send(req.user);
})
router.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send(req.user.admin);
})

router.post("/changeUsername", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(err);
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
                res.json('Username changed!');
            });
        }
    })
})

router.post("/changePwd", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findOne({ email: req.body.email }, function async(err, user) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        if (!user) {
            res.json('Didn\'t found the user!');
            return;
        }
        else {
            bcrypt.compare(req.body.currentPwd, user.password, async (err, result) => {
                if (err) throw err;
                if (result === true) {
                    const salt = await bcrypt.genSalt(10);
                    const mdp = await bcrypt.hash(req.body.newPwd, salt);
                    user.password = mdp;
                    user.save(function (err) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                        res.json('Password changed!');
                    });
                } else {
                    res.json('Wrong current password!');
                    return;
                }
            });

        }
    })
})

router.get("/scoreboard", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            var userMap = {};

            users.forEach(function (user) {
                userMap[user._id] = {
                    username: user.name,
                    score: user.score
                };
            });
            res.json(userMap);
        }
    });
})

router.get("/challenges", passport.authenticate("jwt", { session: false }), (req, res) => {
    Challenge.find({}, function (err, challenges) {
        if (err) {
            console.log(err);
        } else {
            var challengesMap = {};
            challenges.forEach(function (challenge) {
                challengesMap[challenge._id] = {
                    title: challenge.title,
                    categorie: challenge.categorie,
                    link: challenge.link,
                    flags: challenge.flags
                };
            });
            res.json(challengesMap);
        }
    });
})

module.exports = router;