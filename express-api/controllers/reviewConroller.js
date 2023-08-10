import * as factory from "./handlersFactory.js";
import {reviewModel as Review} from "../models/review_model.js";

export const getReviews = factory.getAll(Review);

export const getReview = factory.getOne(Review);

export const createReview = factory.createOne(Review);

export const updateReview = factory.updateOne(Review);

export const deleteReview = factory.deleteOne(Review);
