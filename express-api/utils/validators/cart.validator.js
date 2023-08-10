import { body, param, query } from "express-validator";
import { validatorMiddleware } from "../../middleware/validator_middleware.js";

export const addProductVal = [
  body("productId").notEmpty().isMongoId(),
  body("quantity").optional().isFloat({ min: 1 }).isInt(),
  validatorMiddleware,
];

export const removeProductVal = [
  body("productId").notEmpty().isMongoId(),
  validatorMiddleware,
];
