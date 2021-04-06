const router = require('express').Router();
var mongoose = require('mongoose');
const User = require('../../models/user')
var crypto = require('crypto');
const { query } = require('express');

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch((err) => {
            console.error({ err });
        })
})

router.post('/', (req, res) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(req.body.password.escape(query), salt,
        1000, 64, `sha512`).toString(`hex`);

    const newUser = new User({
        name: req.body.name.escape(query),
        email: req.body.email.escape(query),
        password: hash
    })
    newUser.save(user => res.json(user))

})
module.exports = router;