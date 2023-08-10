import { body, param, query } from "express-validator";
import { validatorMiddleware } from "../../middleware/validator_middleware.js";

export const createVal = [
  body("shippingAddress.details").optional().isString(),
  body("shippingAddress.phone").optional().isString(),
  body("shippingAddress.city").optional().isString(),
  body("shippingAddress.postalCode").optional().isString(),
  validatorMiddleware,
];

export const updateVal = [
  body("paymentMethodType")
    .optional()
    .isString()
    .custom((val) => {
      if (val !== "cash" || val !== "card")
        throw new Error("invalid payment method");
    }),
  body("isPaid").optional().isBoolean(),
  body("paidAt").optional().isISO8601(),
  body("deliveredAt").optional().isISO8601(),
  body("userId").optional().isEmpty(),
  body("products").optional().isEmpty(),
  body("totalOrderPrice").optional().isEmpty(),
  validatorMiddleware,
];

export const revenuVal = [
  query("start")
    .optional()
    .isISO8601()
    .custom((value, { req }) => {
      if (!req.query.end) throw new Error("must query end date");
    }),
  query("end")
    .optional()
    .isISO8601()
    .custom((value, { req }) => {
      if (!req.query.start) throw new Error("must query start date");
    }),
  validatorMiddleware,
];

export const orderIdParamVal = [
  param("orderId").isMongoId(),
  validatorMiddleware,
];

export const findVal = [
  body().custom((val, { req }) => (req.body.queryFilter = {})),
  query("limit").default(10).isInt({ min: 1 }).toInt(),
  query("page").default(1).isInt({ min: 1 }).toInt(),
  query("isPaid")
    .optional()
    .custom((val) => {
      if (!(val === "true" || val === "false")) throw new Error();
      return val;
    })
    .customSanitizer((val) => (val === "true" ? true : false))
    .custom((val, { req }) => {
      req.body.queryFilter["isPaid"] = val;
      return true;
    })
    .withMessage("aaaa"),
  query("isDeleviered")
    .optional()
    .custom((val) => {
      if (!(val === "true" || val === "false")) throw new Error();
      return val;
    })
    .customSanitizer((val) => (val === "true" ? true : false))
    .custom((val, { req }) => {
      req.body.queryFilter["isDeleviered"] = val;
      return true;
    }),
  query("paidStart")
    .optional()
    .isISO8601()
    .custom((val, { req }) => {
      if (!req.query.paidEnd) throw new Error("must query paid end date");
      return val;
    }),
  query("paidEnd")
    .optional()
    .isISO8601()
    .custom((value, { req }) => {
      if (!req.query.paidStart) throw new Error("must query paid start date");
      req.body.queryFilter["paidAt"] = {
        $gte: new Date(req.query.paidStart),
        $lte: new Date(req.query.paidEnd),
      };
      return value;
    }),
  query("delevieredStart")
    .optional()
    .isISO8601()
    .custom((value, { req }) => {
      if (!req.query.delevieredEnd)
        throw new Error("must query delevery end date");
      return value;
    }),
  query("delevieredEnd")
    .optional()
    .isISO8601()
    .custom((value, { req }) => {
      if (!req.query.delevieredStart)
        throw new Error("must query delevery start date");
      req.body.queryFilter["deliveredAt"] = {
        $gte: new Date(req.query.delevieredStart),
        $lte: new Date(req.query.delevieredEnd),
      };
      return value;
    }),
  validatorMiddleware,
];
