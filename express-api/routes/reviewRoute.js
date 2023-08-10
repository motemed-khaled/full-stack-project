const express = require("express");

const {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} = require("../utils/validators/reviewValidator");

const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
} = require("../controllers/reviewConroller");

import {
  auth as protectRoute,
  allowedTo,
} from "../controllers/authController.js";

export const router = express.Router();

router.get("/getAllReviews", getReviews);
router.post(
  "/",
  protectRoute,
  allowedTo("user"),
  createReviewValidator,
  createReview
);
router.get("/getReviewById/:id", getReviewValidator, getReview);
router.put(
  "/updateReviewById/:id",
  protectRoute,
  allowedTo("user"),
  updateReviewValidator,
  updateReview
);
router.delete(
  "/deleteReviewById/:id",
  protectRoute,
  allowedTo("user", "manager", "admin"),
  deleteReviewValidator,
  deleteReview
);
