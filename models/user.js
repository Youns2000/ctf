const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserItem = new Schema({
    name: {
        type: String,
        required: false,
        default: ""
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    actived: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = User = mongoose.model('user', UserItem);