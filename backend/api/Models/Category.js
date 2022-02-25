const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const CategorySchema = new Schema({
    name: String,
    color: {
        type: String,
        default: "#5c7ae6"
    }
})

module.exports = mongoose.model('Category', CategorySchema);