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
    }
})

module.exports = User = mongoose.model('user', UserItem);