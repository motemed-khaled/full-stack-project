import Strategy from "passport-google-oauth2";
import { env } from "../env.js";
import { userModel } from "../../models/userModel.js";
import { generateToken } from "../../utils/generateToken.js";

export const googleStrategy = new Strategy.Strategy(
  {
    clientID: env.oAuth.google.id,
    clientSecret: env.oAuth.google.secret,
    callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
    passReqToCallback: true,
    scope: ["profile", "email"],
  },
  async function verify(request, accessToken, refreshToken, profile, cb) {
    let user = await userModel.findOne({ googleId: profile._json.sub });
    if (user) {
      user.token = generateToken(user.id);
      await user.save()
      return cb(null, {id: user.id, token: user.token});
    }
    user = await userModel.create({
      name: profile._json.name,
      email: profile._json.email,
      googleId: profile._json.sub,
    });
    return cb(null, {id: user.id, token: user.token});
  }
);
