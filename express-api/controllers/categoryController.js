const Categorymodel = require("../models/categoryModel");
const factory = require("./handlersFactory");

exports.getCategories = factory.getAll(Categorymodel, "categories");

exports.getCategory = factory.getOne(Categorymodel, "category");

exports.creatCategory = factory.createOne(Categorymodel);

exports.updateCategory = factory.updateOne(Categorymodel, "category");

exports.deleteCategory = factory.deleteOne(Categorymodel, "category");
