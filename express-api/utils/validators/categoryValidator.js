import { check } from "express-validator";

import { validatorMiddleware } from "../../middleware/validator_middleware.js";

export const getCategoryValidator = [
  check("id").isMongoId().withMessage("not valid category id"),
  validatorMiddleware,
];

export const creatCategoryValidator = [
  check("title")
    .isString()
    .withMessage("Category title should be string")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short caregory title")
    .isLength({ max: 32 })
    .withMessage("Too long category title"),
  validatorMiddleware,
];

export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("not valid category id"),
  validatorMiddleware,
  check("title")
    .isString()
    .withMessage("Category title should be string")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short caregory title")
    .isLength({ max: 32 })
    .withMessage("Too long category title"),
  validatorMiddleware,
];

export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("not valid category id"),
  validatorMiddleware,
];
