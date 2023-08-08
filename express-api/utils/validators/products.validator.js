import { body, param, query } from "express-validator";
import { validatorMiddleware } from "../../middleware/validator_middleware.js";

export const createVal = [
  body("title").notEmpty().isLength({ min: 3, max: 100 }),
  body("description").notEmpty().isLength({ min: 20 }),
  body("quantity").isNumeric().isInt({ min: 1 }),
  body("sold").optional().isEmpty(),
  body("price").notEmpty().isNumeric().isFloat({ min: 0.01, max: 200000 }),
  body("imageCover").optional(),
  body("category").notEmpty().isMongoId(),
  body("ratingsAverage").optional().isEmpty(),
  body("ratingsQuantity").optional().isEmpty(),
  validatorMiddleware,
];

export const updateVal = [
  body("title").optional().notEmpty().isLength({ min: 3, max: 100 }),
  body("description").optional().notEmpty().isLength({ min: 20 }),
  body("quantity").optional().isNumeric().isInt({ min: 1 }),
  body("sold").optional().isEmpty(),
  body("price")
    .optional()
    .notEmpty()
    .isNumeric()
    .isFloat({ min: 0.01, max: 200000 }),
  body("imageCover").optional().notEmpty(),
  body("category").optional().notEmpty().isMongoId(),
  body("ratingsAverage").optional().isEmpty(),
  body("ratingsQuantity").optional().isEmpty(),
  validatorMiddleware,
];

export const productIdParamVal = [
  param("productId").isMongoId(),
  validatorMiddleware,
];

export const statisticsVal = [
  query("start")
    .optional()
    .isISO8601()
    .custom((value, { req }) => {
      if (!req.query.end) throw new Error("must query end date");
      return value;
    }),
  query("end")
    .optional()
    .isISO8601()
    .custom((value, { req }) => {
      if (!req.query.start) throw new Error("must query start date");
      return value;
    }),
  validatorMiddleware,
];
