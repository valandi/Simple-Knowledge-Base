const mongoose = require('mongoose');
const Article = require('../Models/Article');
const zendesk = require('node-zendesk');
const ArticleController = require('./ArticleController');

const zendeskClient = zendesk.createClient({
    username: process.env.ZD_USERNAME,
    token: process.env.ZD_TOKEN,
    remoteUri: process.env.ZD_URI
})
const trelloKey = process.env.TRELLO_KEY;
const trelloToken = process.env.TRELLO_TOKEN;

/*
    req.body: {
        searchQuery: {
            text,
            category,
            tags
        },
        isZendesk: bool,
        isTrello: bool
    }
*/

module.exports.searchAll = async function(req, res) {
    try {
        let searchJobs = [];
        searchJobs.push(searchArticles(req.body.searchQuery));
        if (req.body.isZendesk) searchJobs.push(searchZendesk(req.body.searchQuery));
        // if (req.body.isTrello) searchJobs.push(searchTrello(req.body.searchQuery));

        const searchResults = await Promise.all(searchJobs);
        console.log(searchResults);
        res.status(200).send({});
    } catch(e) {
        res.status(400).send({
            error: true,
            msg: "Error Searching"
        })
    }
}

const searchArticles = async function(query) {
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
    return articles;
}

const searchZendesk = async function(query) {
    let zendeskQueryString = "type: ticket ";
    if (query.text && query.text.length > 0) {
        zendeskQueryString += query.text + " ";
    }
    if (query.tags && query.tags.length > 0) {
        query.tags.foreach((tag) => {
            zendeskQueryString += tag.name + " ";
        })
    }
    console.log(zendeskQueryString);
    
    console.log(zendeskClient.search);
}