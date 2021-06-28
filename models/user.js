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
    admin: {
        type: Boolean,
        default: false
    },
    actived: {
        type: Boolean,
        default: false
    },
    confirmationCode: {
        type: String
    }

}, { collection: 'users' })

module.exports = User = mongoose.model('user', UserItem);