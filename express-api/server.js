import path from "path";

import exppress from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import passport from "passport";
import session from "express-session";

dotenv.config();
import { ApiError } from "./utils//api_errors.js";
import { dbConnection } from "./config/database.js";
import { globalError } from "./middleware/error_middleware.js";
import { googleStrategy } from "./config/oauth/google.js";

// routes
import { mountRoutes } from "./routes/mountRoutes.js";

//connect with database
dbConnection();

// express app
const app = exppress();
// Passport(passport);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// Cross-origin resource sharing to enable other domain to access to access this application
app.use(cors());
app.options("*", cors());

// compress all response
app.use(compression());

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}
app.use(exppress.urlencoded({ extended: true }));
app.use(exppress.json({ limit: "20kb" }));
app.use(xss());

// to applay data sanitization
app.use(mongoSanitize());

// to protect aganist http parameters polluation attack
app.use(
  hpp({
    whitelist: [
      "price",
      "sold",
      "quantity",
      "ratingsAverage",
      "ratingsQuantity",
    ],
  })
);

// to serve all image
app.use(exppress.static(path.join(path.dirname("uploads"), "uploads")));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message:
    "Too many requests created from this IP, please try again after an 15 min",
});
// Apply the rate limiting middleware to forgotpassword requests
app.use("/api/v1/auth/forgotpassword", limiter);

//mount routes
// test google auth
app.get("/test/oauth", (req, res) => {
  res.send('<a href="/api/v1/auth/google">Sign in with Google</a>');
});

passport.use(googleStrategy);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (id, done) {
  done(err, null);
});
mountRoutes(app);

app.all("*", (req, res, next) => {
  next(new ApiError(`cant find this route : ${req.originalUrl}`, 400));
});

// global error handle from express
app.use(globalError);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`server is running in http://localhost:${PORT}`);
});

// handle error rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection : ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("server shutdown.....");
    process.exit(1);
  });
});
