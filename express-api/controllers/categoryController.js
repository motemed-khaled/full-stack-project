import  {catogryModel} from "../models/catogry-model.js";
import  * as factory from "./handlersFactory.js";

export const getCategories = factory.getAll(catogryModel, "categories");

export const getCategory = factory.getOne(catogryModel, "category");

export const creatCategory = factory.createOne(catogryModel);

export const updateCategory = factory.updateOne(catogryModel, "category");

export const deleteCategory = factory.deleteOne(catogryModel, "category");
