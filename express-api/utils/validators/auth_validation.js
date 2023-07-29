import { check } from "express-validator";

import { validatorMiddleware } from "../../middleware/validator_middleware.js";

export const sginupValidation = [
    check("name")
        .notEmpty().withMessage("userName is required"),
    check("email")
        .isEmail().withMessage("invalid email format"),
    check("password")
        .notEmpty().withMessage("password is required")
        .isLength({ min: 6 }).withMessage("to short password"),
    validatorMiddleware
];

export const loginValidation = [
    check("email")
        .isEmail().withMessage("invalid email format"),
    check("password")
        .notEmpty().withMessage("password is required"),
    validatorMiddleware
];

export const forgetPasswordValidation = [
    check("email")
        .isEmail().withMessage("invalid email format"),
    validatorMiddleware
];

export const verifyResetCodeValidation = [
    check("resetCode").isNumeric().withMessage("resetcode mustbe number"),
    validatorMiddleware
];

export const resetPasswordValidation = [
    check("email")
        .isEmail().withMessage("invalid email format"),
    check("password")
        .notEmpty().withMessage("password is required")
        .isLength({ min: 6 }).withMessage("to short password"),
    validatorMiddleware
];