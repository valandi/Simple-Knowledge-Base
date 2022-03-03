const mongoose = require('mongoose');
const Article = require('../Models/Article');
const zendesk = require('node-zendesk');
const ArticleController = require('./ArticleController');

const zendeskClient = zendesk.createClient({
    username: process.env.ZD_USERNAME,
    token: process.env.ZD_TOKEN,
    remoteUri: process.env.ZD_URI
})
const zendeskTicketUrl = "https://applitools.zendesk.com/agent/tickets/";
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
        let promises = [];
        promises.push(searchArticles(req.body.searchQuery));
        if (req.body.isZendesk) promises.push(searchZendesk(req.body.searchQuery));
        // if (req.body.isTrello) searchJobs.push(searchTrello(req.body.searchQuery));

        const searches = await Promise.all(promises);
        const results = {
            articles: searches[0],
            tickets: req.body.isZendesk ? searches[1] : undefined,
            // trellos: 
            //     req.body.isZendesk && req.body.isTrello ? searches[2] : 
            //         req.body.isTrello ? searches[1] : [],
        }

        res.status(200).send({data: results});
    } catch(e) {
        console.log("SearchController.searchAll")
        console.log(e);
        res.status(400).send({
            error: true,
            msg: "Error Searching"
        })
    }
}

const searchArticles = async function(query) {
    let mongoQuery = {};
    if (query.tags && query.tags.length > 0) {
        mongoQuery['tags'] = {"$in": query.tags.map((tag) => mongoose.Types.ObjectId(tag._id))}
    }
    if (query.category && query.category._id) {
        mongoQuery['category'] = mongoose.Types.ObjectId(query.category._id);
    }
    if (query.text && query.text.length > 0) {
        mongoQuery['$text'] = {"$search": query.text};
    }
    let articles = await Article.find(mongoQuery).populate(['tags', 'category']);
    return articles;
}

const searchZendesk = async function(query) {
    let zendeskQueryString = "type:ticket ";
    if (query.text && query.text.length > 0) {
        zendeskQueryString += query.text + " ";
    }
    if (query.tags && query.tags.length > 0) {
        zendeskQueryString += "description:"
        query.tags.forEach((tag) => {
            zendeskQueryString += tag.name + " ";
        })
    }
    zendeskQueryString += "order_by:created_at sort:desc";
    let tix = await zendeskClient.search.query(zendeskQueryString);
    // console.log(tix);
    const urls = tix.map((ticket) => {
        return {id: ticket.id, url: zendeskTicketUrl + ticket.id};
    })
    console.log(urls);
    // console.log(zendeskClient.search);
    return urls;
}