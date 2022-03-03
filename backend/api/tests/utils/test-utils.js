module.exports.getRandomString = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

module.exports.getBaseUrl = () => {
    return "http://localhost:5005";
}

module.exports.generateTag = () => ({
    "name": this.getRandomString()
});

module.exports.generateCategory = () => ({
    "name": this.getRandomString()
});
