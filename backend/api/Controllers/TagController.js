const mongoose = require('mongoose');
const Tag = require('../Models/Tag');

module.exports.saveTag = async function(req, res) {
    console.log(req.body);
    const newTag = Tag(req.body);
    await newTag.save();
    res.status(201).send({data: newTag});
}

module.exports.editTag = async function(req, res) {
    const query = await Tag.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(req.body._id)}, {$set: {name: req.body.name, color: req.body.color}})
    res.status(200).send({
    });
}

module.exports.getTags = async function(req, res) {
    const query = await Tag.find({});
    res.status(200).send({data: query});
}

module.exports.getTag = async function(req, res) {
    const query = await Tag.find({_id: req.params.id});
    res.status(200).send({data: query[0]});
}

module.exports.deleteTag = async function(req, res) {
    console.log(req.params.id);
    const query = await Tag.findByIdAndDelete({_id: new mongoose.Types.ObjectId(req.params.id)})
    res.status(200).send({});
}