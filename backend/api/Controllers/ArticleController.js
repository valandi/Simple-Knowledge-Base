const mongoose = require('mongoose');
const Article = require('../Models/Article');

module.exports.saveArticle = async function(req, res) {
    console.log(req.body);
    const newArticle = Article(req.body);
    await newArticle.save();
    res.status(201).send({data: newArticle});
}

module.exports.editArticle = async function(req, res) {
    console.log(req.body);
    const query = await Article.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(req.body._id)}, {$set: {markdown: req.body.markdown, title: req.body.title, category: req.body.category, tags: req.body.tags}})
    console.log(query);
    res.status(200).send({});
}

module.exports.getArticles = async function(req, res) {
    const query = await Article.find({}).select(['_id', 'title']);
    res.status(200).send({data: query});
}

module.exports.getArticle = async function(req, res) {
    const query = await Article.find({_id: req.params.id}).populate(['tags', 'category']);
    res.status(200).send({data: query[0]});
}

module.exports.deleteArticle = async function(req, res) {
    console.log(req.params.id);
    const query = await Article.findByIdAndDelete({_id: new mongoose.Types.ObjectId(req.params.id)})
    res.status(200).send({});
}

module.exports.searchArticles = async function(req, res) {
    query = {};
    if (req.body.tags && req.body.tags.length > 0) {
        query['tags'] = {"$in": req.body.tags.map((tag) => mongoose.Types.ObjectId(tag._id))}
    }
    if (req.body.category && req.body.category._id) {
        query['category'] = mongoose.Types.ObjectId(req.body.category._id);
    }
    if (req.body.text && req.body.text.length > 0) {
        query['$text'] = {"$search": req.body.text};
    }
    let articles = await Article.find(query);
    res.status(200).send({data: articles});
}