const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const TagSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    color: {
        type: String,
        default: "#09b87d"
    }
})

module.exports = mongoose.model('Tag', TagSchema);