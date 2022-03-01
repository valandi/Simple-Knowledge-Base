const mongoose = require('mongoose');
const Article = require('../Models/Article');

module.exports.saveArticle = async function(req, res) {
    try {
        const newArticle = Article(req.body);
        await newArticle.save();
        res.status(201).send({data: newArticle});
    } catch(e) {
        console.log("ArticleController.saveArticle");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Creating Article"
        });
    }
}

module.exports.editArticle = async function(req, res) {
    try {
        await Article.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(req.body._id)}, {$set: {markdown: req.body.markdown, title: req.body.title, category: req.body.category, tags: req.body.tags}})
        res.status(200).send({});
    } catch(e) {
        console.log("ArticleController.editArticle");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Editing Article"
        });
    }
    
}

module.exports.getArticles = async function(req, res) {
    try {
        const query = await Article.find({}).select(['_id', 'title']);
        res.status(200).send({data: query});
    } catch(e) {
        console.log("ArticleController.getArticles");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Getting Articles"
        });
    }
    
}

module.exports.getArticle = async function(req, res) {
    try {
        const query = await Article.find({_id: req.params.id}).populate(['tags', 'category']);
        res.status(200).send({data: query[0]});
    } catch(e) {
        console.log("ArticleController.getArticle");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Getting Article"
        });
    }
}

module.exports.deleteArticle = async function(req, res) {
    try {
        const query = await Article.findByIdAndDelete({_id: new mongoose.Types.ObjectId(req.params.id)})
        res.status(200).send({});
    } catch(e) {
        console.log("ArticleController.deleteArticle");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Deleting Article"
        });
    }

}

module.exports.searchArticles = async function(req, res) {
    try {
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
        let articles = await Article.find(query).populate(['tags', 'category']);
        res.status(200).send({data: articles});
    } catch(e) {
        console.log("ArticleController.searchArticles");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Searching Articles"
        });
    }
    
}