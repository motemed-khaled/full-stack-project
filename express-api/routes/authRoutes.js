import express from "express";
import passport from "passport";

import { sginUp , login  } from "../controllers/authController.js";
import {
    forgetBassword,
    verifyResetCode,
    updateUserPassword
} from "../controllers/forgetBasswordController.js";

import {
    forgetPasswordValidation,
    loginValidation,
    resetPasswordValidation,
    sginupValidation,
    verifyResetCodeValidation
} from "../utils/validators/auth_validation.js";

export const router = express.Router();

router.post("/signup" ,sginupValidation, sginUp);

router.post("/login",loginValidation, login);

router.post("/forgotpassword",forgetPasswordValidation, forgetBassword);

router.post("/verifyresetcode",verifyResetCodeValidation, verifyResetCode);

router.put("/resetpassword", resetPasswordValidation, updateUserPassword);


router.get('/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));
 
router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));