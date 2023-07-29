import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";

import { ApiError } from "../utils/api_errors.js";
import { userModel } from "../models/userModel.js";
import {
    deleteOne,
    createOne,
    getOne,
    getAll
} from "./handlersFactory.js";
import { generateToken } from "../utils/generateToken.js";


export const createUser = createOne(userModel);

export const getAllUsers = getAll(userModel , "user");

export const getSpecificUser  = getOne(userModel);

export const updateUser = asyncHandler(async (req, res, next) => {

    const document = await userModel.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            active:req.body.active,
        },
        { new: true }
    );
    if (!document) {
        return next(new ApiError(`No Document In This Id : ${req.params.id}`, 404));
    }
    res.status(200).json({ });
});

export const updateUserPassword = asyncHandler(async (req, res, next) => {

    const document = await userModel.findByIdAndUpdate(
        req.params.id,
        {
            password: await bcryptjs.hash(req.body.password, 12),
            changePasswordTime : Date.now()
        },
        { new: true }
    );
    if (!document) {
        return next(new ApiError(`No Document In This Id : ${req.params.id}`, 404));
    }
    res.status(200).json({ });
});

export const deleteUser = deleteOne(userModel);

export const toggleActiveUser = asyncHandler(async (req, res, next) => {
    await userModel.findByIdAndUpdate(
        req.params.id,
        {
            active: req.body.active
        }
    );
    res.status(200).json({ });
});

// logged user
 
export const getLoggedUserData = asyncHandler(async (req, res, next) => {
    req.params.id = req.user._id;
    next();
});

export const updateUserLoggedPassword = asyncHandler(async (req, res, next) => {
    const document = await userModel.findByIdAndUpdate(
        req.user._id,
        {
            password: await bcryptjs.hash(req.body.password, 12),
            changePasswordTime: Date.now()
        },
        { new: true }
    );
    const token = generateToken(document._id);
    res.status(200).json({ token: token });
});

export const updateUserLoggedData = asyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        {
            name: req.body.name,
            email: req.body.email,
        },
        { new: true }
    );
    res.status(200).json({ });
});

export const deactiveUserLogged = asyncHandler(async (req, res, next) => {
    await userModel.findByIdAndUpdate(
        req.user._id,
        {
            active: false
        }
    );
    res.status(200).json({ });
});

