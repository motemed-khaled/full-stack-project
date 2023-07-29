import GoogleStrategy from "passport-google-oauth2";

import { userModel } from "../models/userModel.js";

export const Passport = (passport) => {
    passport.use(new GoogleStrategy.Strategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
        passReqToCallback   : true
      },
      async function(request, accessToken, refreshToken, profile, done) {
        try {
          const user = await userModel.find({ googleId: profile.id });
          if (user) {
            done(null , user)
          } else {
            const user = await userModel.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.email
            });
            done(null, user);
          }
        } catch (error) {
          
        }
      }
    ));
  
  passport.serializeUser(function (user, done) {
    done(null, user)
  });
  passport.deserializeUser(function (user, done) {
      done(null , user)
  })
}
