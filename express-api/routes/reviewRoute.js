import express from 'express'

import {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} from "../utils/validators/reviewValidator.js";

import {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewConroller.js";

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
