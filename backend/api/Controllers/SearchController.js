const mongoose = require('mongoose');
const fetch = require('node-fetch');
const Article = require('../Models/Article');
const zendeskAuthToken = Buffer.from(process.env.ZD_USERNAME + "/token:" + process.env.ZD_TOKEN).toString('base64');
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
        if (req.body.isTrello) promises.push(searchTrello(req.body.searchQuery));
        const searches = await Promise.all(promises);

        const results = {
            articles: searches[0],
            tickets: req.body.isZendesk ? searches[1] : undefined,
            trellos: 
                (req.body.isZendesk && req.body.isTrello) ? searches[2] : 
                    req.body.isTrello ? searches[1] : undefined,
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
    let zendeskQueryString = "type:ticket order_by:created_at sort:desc ";
    let queryEdited = false;
    if (query.text && query.text.length > 0) {
        zendeskQueryString += query.text + " ";
        queryEdited = true;
    }
    if (query.tags && query.tags.length > 0) {
        zendeskQueryString += "description:"
        query.tags.forEach((tag) => {
            zendeskQueryString += tag.name + " ";
        })
        queryEdited = true;
    }
    if (!queryEdited) return [];
    zendeskQueryString = encodeURIComponent(zendeskQueryString);
    let url = process.env.ZD_URI 
    + "/search.json?query=" 
    + zendeskQueryString 
    + "&per_page=50"
    + "&include=highlights";
    const request = await fetch(url, {
        method: "get",
        headers: {'Authorization': 'Basic ' + zendeskAuthToken}
    })
    const results = (await request.json()).results;
    console.log(results[0]);
    const tickets = results.map((ticket) => {
        return {id: ticket.id, url: zendeskTicketUrl + ticket.id, subject: ticket.subject};
    })
    return tickets;
}

const searchTrello = async function(query) {
    let trelloUrl = "https://api.trello.com/1/search?query=";
    let trelloQueryString = "";
    let queryEdited = false;

    if (query.text && query.text.length > 0) {
        trelloQueryString += query.text + " ";
        queryEdited = true;
    }
    if (query.tags && query.tags.length > 0) {
        query.tags.forEach((tag) => {
            trelloQueryString += tag.name + " ";
        })
        queryEdited = true;
    }
    if (queryEdited) {
        //remove trailing whitespace
        trelloQueryString = trelloQueryString.slice(0, -1);
        trelloQueryString = encodeURIComponent(trelloQueryString);
        trelloUrl += trelloQueryString 
        + "&modelTypes=cards"
        + "&cards_limit=50"
        + "&key=" + trelloKey 
        + "&token=" + trelloToken;

        let request = await fetch(trelloUrl);
        let response = await request.json();

        const cards = response.cards.map((card) => {
            return {url: card.shortUrl, title: card.name}
        })
        return cards;
    } else {
        return [];
    }
}