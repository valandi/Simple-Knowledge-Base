const mongoose = require('mongoose');
const Category = require('../Models/Category');

module.exports.saveCategory = async function(req, res) {
    console.log(req.body);
    const newCategory = Category(req.body);
    await newCategory.save();
    res.status(201).send({data: newCategory});
}

module.exports.editCategory = async function(req, res) {
    const query = await Category.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(req.body._id)}, {$set: {name: req.body.name, color: req.body.color}})
    res.status(200).send({
    });
}

module.exports.getCategories = async function(req, res) {
    const query = await Category.find({});
    res.status(200).send({data: query});
}

module.exports.getCategory = async function(req, res) {
    const query = await Category.find({_id: req.params.id});
    res.status(200).send({data: query[0]});
}

module.exports.deleteCategory = async function(req, res) {
    console.log(req.params.id);
    const query = await Category.findByIdAndDelete({_id: new mongoose.Types.ObjectId(req.params.id)})
    res.status(200).send({});
}