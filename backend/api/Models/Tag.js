const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const TagSchema = new Schema({
    name: String,
    color: {
        type: String,
        default: "#09b87d"
    }
})

module.exports = mongoose.model('Tag', TagSchema);