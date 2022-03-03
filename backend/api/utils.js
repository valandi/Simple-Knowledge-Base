const zendeskAuthToken = Buffer.from(process.env.ZD_USERNAME + "/token:" + process.env.ZD_TOKEN).toString('base64');
const fetch = require('node-fetch');

module.exports.zendeskFieldMap = {
    "SDK": "360029041172",
    "Grid_Provider": "360029361312",
    "Topic": "360010712592",
}
module.exports.zendeskTicketUrl = "https://applitools.zendesk.com/agent/tickets/";
module.exports.zendeskApiURl = "https://applitools.zendesk.com/api/v2";

module.exports.makeZDRequest = async function(url, method="get", body="undefined") {
    const request = await fetch(url, {
        method,
        headers: {'Authorization': 'Basic ' + zendeskAuthToken}
    })
    const results = await request.json();
    return results;
}