const mongoose = require('mongoose');
const fetch = require('node-fetch');
const Article = require('../Models/Article');
const { makeZDRequest, zendeskTicketUrl, zendeskApiURl, zendeskFieldMap } = require('../utils');
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
        if (req.body.isZendesk) promises.push(searchZendesk(req.body.searchQuery, req.body.zendeskQuery));
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

const searchZendesk = async function(query, zendeskQuery) {
    console.log(zendeskQuery);
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
    if (zendeskQuery.sdks) {
        zendeskQueryString += "custom_field_" + zendeskFieldMap['SDK'] + ":" + zendeskQuery.sdks + " ";
    }
    if (zendeskQuery.grid) {
        zendeskQueryString += "custom_field_" + zendeskFieldMap['Grid_Provider'] + ":" + zendeskQuery.grid + " ";
    }
    if (zendeskQuery.topic) {
        zendeskQueryString += "custom_field_" + zendeskFieldMap['Topic'] + ":" + zendeskQuery.topic + " ";
    }
    console.log(zendeskQueryString);
    zendeskQueryString = encodeURIComponent(zendeskQueryString);
    let url = zendeskApiURl
    + "/search.json?query=" 
    + zendeskQueryString 
    + "&per_page=50"
    + "&include=highlights";

    const req = await makeZDRequest(url);
    const tickets = req.results.map((ticket) => {
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
        console.log(cards);
        return cards;
    } else {
        return [];
    }
}

module.exports.getZDOptions = async function(req, res) {
    try {
        let sdkOptionsUrl = zendeskApiURl + "/ticket_fields/" + zendeskFieldMap['SDK'] + "/options";
        let gpOptionsUrl = zendeskApiURl + "/ticket_fields/" + zendeskFieldMap['Grid_Provider'] + "/options";
        let topicOptionsUrl = zendeskApiURl + "/ticket_fields/" + zendeskFieldMap['Topic'] + "/options";
        let promises = [];
        promises.push(getOptionsRequest(sdkOptionsUrl));
        promises.push(getOptionsRequest(gpOptionsUrl));
        promises.push(getOptionsRequest(topicOptionsUrl));
        const options = await Promise.all(promises);
        res.status(200).send({
            data: {
                sdks: options[0],
                grids: options[1],
                topics: options[2],
            }
        })
    } catch(e) {
        console.log("SearchController.getZDOptions");
        console.log(e);
        res.status(400).send({
            error: true,
            msg: "Error Getting Zendesk Options"
        })
    }
    
}

async function getOptionsRequest(url) {
    const req = await makeZDRequest(url);
    let rawOptions = req.custom_field_options;
    const options = rawOptions.map((option) => {
        return option.name;
    });
    return options;
}