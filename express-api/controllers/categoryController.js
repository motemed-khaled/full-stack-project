import  {catogryModel} from "../models/catogry-model.js";
import  * as factory from "./handlersFactory.js";

export const getCategories = factory.getAll(catogryModel, "categories");

export const getCategory = factory.getOne(catogryModel);

export const creatCategory = factory.createOne(catogryModel);

export const updateCategory = factory.updateOne(catogryModel);

export const deleteCategory = factory.deleteOne(catogryModel);
