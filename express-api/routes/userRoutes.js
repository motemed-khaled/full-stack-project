import express from "express";

import {
    createUser,
    deleteUser,
    getAllUsers,
    getSpecificUser,
    updateUser,
    updateUserPassword,
    getLoggedUserData,
    updateUserLoggedPassword,
    updateUserLoggedData,
    deactiveUserLogged,
    toggleActiveUser
} from "../controllers/userController.js";
import {
    createUserValidation,
    deleteUserValidation,
    getSpecificUserValidation,
    updateUserValidation,
    updateUserPasswordValidation,
    updateLoggedUserValidation,
    updateUserLoggedPasswordValidation,
    toggleActiveUserValidation
} from "../utils/validators/user_validation.js";
import { auth as protectRoute , allowedTo } from "../controllers/authController.js";


export const router = express.Router();

router.use(protectRoute);

// logged user routes
router.get("/getloggeduser", getLoggedUserData,getSpecificUser);
router.put("/updateuserpassword",updateUserLoggedPasswordValidation, updateUserLoggedPassword);
router.put("/updateuserdata",updateLoggedUserValidation,updateUserLoggedData);
router.put("/deactivloggeduser",deactiveUserLogged);

// routes accsses admin and super admin
router.put("/changepassword/:id",allowedTo("superAdmin" , "admin"),updateUserPasswordValidation,  updateUserPassword);

router
    .route("/")
    .post(allowedTo("superAdmin"),createUserValidation,createUser)
    .get(allowedTo("superAdmin" , "admin"),getAllUsers);

router
    .route("/:id")
    .get(allowedTo("superAdmin" , "admin"),getSpecificUserValidation,getSpecificUser)
    .put(allowedTo("superAdmin"), updateUserValidation, updateUser)
    .delete(allowedTo("superAdmin"), deleteUserValidation, deleteUser)
    
router.put("/updateUserActive/:id", allowedTo("superAdmin", "admin"), toggleActiveUserValidation, toggleActiveUser);
    
