const mongoose = require('mongoose');
const Category = require('../Models/Category');
const Article = require('../Models/Article'); 

module.exports.saveCategory = async function(req, res) {
    try {
        const newCategory = Category(req.body);
        await newCategory.save();
        res.status(201).send({data: newCategory});
    } catch(e) {
        console.log("CategoryController.saveCategory");
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

module.exports.editCategory = async function(req, res) {
    try {
        await Category.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(req.body._id)}, {$set: {name: req.body.name, color: req.body.color}})
        res.status(200).send({});
    } catch(e) {
        console.log("CategoryController.editCategory");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Editing Category"
        });
    }
}

module.exports.getCategories = async function(req, res) {
    try {
        const query = await Category.find({});
        res.status(200).send({data: query});
    } catch(e) {
        console.log("CategoryController.getCategories");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Getting Categories"
        });
    }
}

module.exports.getCategory = async function(req, res) {
    try {
        const query = await Category.find({_id: req.params.id});
        res.status(200).send({data: query[0]});
    } catch(e) {
        console.log("CategoryController.getCategory");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Getting Category"
        });
    }
}

module.exports.deleteCategory = async function(req, res) {
    try {
        // TODO: Need to use transactions here to ensure data integrity -- Need ReplSet for Mongo
            // https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/
        await Category.findByIdAndDelete({_id: new mongoose.Types.ObjectId(req.params.id)})
        await Article.updateMany({category: new mongoose.Types.ObjectId(req.params.id)}, {$unset: {category: ""}});
        res.status(200).send({});
    } catch(e) {
        console.log("CategoryController.deleteCategory");
        console.log(e);
        return res.status(400).send({
            error: true,
            msg: "Error Deleting Category"
        });
    }
}