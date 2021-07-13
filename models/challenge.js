const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeItem = new Schema({
    title: {
        type: String,
        required: true,
        default: ""
    },
    flags: {
        type: Schema.Types.Mixed,
        required: false,
        default: undefined
    },
    categorie: {
        type: String,
        required: true,
        default: ""
    },
    link: {
        type: String,
        default: "",
        required: false
    },
    desc: {
        type: String,
        default: "",
        required: false
    },
    solved: {
        type: Array,
        default: [],
        required: false
    }

}, { collection: 'challenges' })

module.exports = Challenge = mongoose.model('challenge', ChallengeItem);