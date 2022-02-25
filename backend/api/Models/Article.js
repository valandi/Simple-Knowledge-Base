const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const ArticleSchema = new Schema({
    markdown: String,
    title: String,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }
})

module.exports = mongoose.model('Article', ArticleSchema);