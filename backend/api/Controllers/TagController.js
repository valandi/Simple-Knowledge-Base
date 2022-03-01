const mongoose = require('mongoose');
const Tag = require('../Models/Tag');
const Article = require('../Models/Article');

module.exports.saveTag = async function(req, res) {
    try {
        const newTag = Tag(req.body);
        await newTag.save();
        res.status(201).send({data: newTag});
    } catch(e) {
        console.log("TagController.saveTag");
        console.log(e);
        let msg;
        if (e.code == 11000) {
            msg = "Duplicate Value"
        } else {
            msg = "Error Saving Category"
        }
        return res.status(400).send({
            error: true,
            msg
        });
    }
}

module.exports.editTag = async function(req, res) {
    try {
        await Tag.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(req.body._id)}, {$set: {name: req.body.name, color: req.body.color}})
        res.status(200).send({});
    } catch(e) {
        console.log("TagController.editTag");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Editing Tag"
        });
    }
}

module.exports.getTags = async function(req, res) {
    try {
        const query = await Tag.find({});
        res.status(200).send({data: query});
    } catch(e) {
        console.log("TagController.getTags");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Getting Tags"
        });
    }
}

module.exports.getTag = async function(req, res) {
    try {
        const query = await Tag.find({_id: req.params.id});
        res.status(200).send({data: query[0]});
    } catch(e) {
        console.log("TagController.getTag");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Getting Tag"
        });
    }
}

module.exports.deleteTag = async function(req, res) {
    try {
        // TODO: Need to use transactions here to ensure data integrity -- Need ReplSet for Mongo
            // https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/
        await Tag.findByIdAndDelete({_id: new mongoose.Types.ObjectId(req.params.id)});
        await Article.updateMany({tag: new mongoose.Types.ObjectId(req.params.id)}, {$pull: {tags: new mongoose.Types.ObjectId(req.params.id)}});
        res.status(200).send({});
    } catch(e) {
        console.log("TagController.deleteTag");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Deleting Tag"
        });
    }
}