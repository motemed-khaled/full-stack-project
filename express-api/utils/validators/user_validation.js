import { check } from "express-validator";
import bcryptjs from "bcryptjs";

import { validatorMiddleware } from "../../middleware/validator_middleware.js";
import { userModel } from "../../models/userModel.js";


export const createUserValidation = [
    check("name")
        .notEmpty().withMessage("name is required"),
    check("email").isEmail().withMessage("invalid email format"),
    check("password")
        .notEmpty().withMessage("password is required")
        .isLength({ min: 6 }).withMessage("to short password"),
    check("active").optional()
        .isBoolean().withMessage("active mustbe boolean value (true or false)"),
    check("role").optional()
        .notEmpty().withMessage("role must be admin or superAdmin or user"),
    validatorMiddleware
];

export const getSpecificUserValidation = [
    check("id").isMongoId().withMessage("invalid id format"),
    validatorMiddleware
];

export const deleteUserValidation = [
    check("id").isMongoId().withMessage("invalid id format"),
    validatorMiddleware
];

export const updateUserValidation = [
    check("id").isMongoId().withMessage("invalid id format"),
    check("name").optional()
        .notEmpty().withMessage("name is required"),
    check("email").optional()
        .isEmail().withMessage("invalid email format"),
    check("active").optional()
        .isBoolean().withMessage("active mustbe boolean value (true or false)"),
    check("role").optional()
        .notEmpty().withMessage("role must be admin or superAdmin or user"),
    validatorMiddleware
];

export const updateUserPasswordValidation = [
    check("id").isMongoId().withMessage("invalid id format"),
    check("currentPassword")
        .notEmpty().withMessage("current password is required"),

    check("password")
        .notEmpty().withMessage("password is required")
        .isLength({ min: 6 }).withMessage("too short password")
        // verify current password
        .custom(async(val, { req }) => {
            const user = await userModel.findById(req.params.id, { password: 1 });
            if (!user) {
                throw new Error(`no user in this id : ${req.params.id}`);
            }
            const wrongPassword = await bcryptjs.compare(req.body.currentPassword, user.password);
            if (!wrongPassword) {
                throw new Error("incorrect current password")
            }
            return true;
    }),
    validatorMiddleware
];

export const updateUserLoggedPasswordValidation = [
    check("password")
        .notEmpty().withMessage("password is required")
        .isLength({ min: 6 }).withMessage("too short password"),
    validatorMiddleware
];

export const updateLoggedUserValidation = [
    check("name")
        .optional()
        .notEmpty().withMessage("name is required")
        .isLength({ min: 3 }).withMessage("too short name"),

    check("email")
        .optional()
        .isEmail().withMessage("invalid email address")
        .custom(val => {
            return userModel.findOne({ email: val }).then(user => {
                if (user) {
                    return Promise.reject("email address already in use")
                }
            });
        }),
    validatorMiddleware
];

export const toggleActiveUserValidation = [
    check("id")
        .isMongoId().withMessage("invalid id format"),
    check("active")
        .isBoolean().withMessage("active value mustbe boolean value (true or false)"),
    validatorMiddleware
];