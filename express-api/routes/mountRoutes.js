import { router as userRoutes } from "./userRoutes.js";
import { router as authRoutes } from "./authRoutes.js";
import { router as categoryRoutes } from "./categoryRoute.js";
import { router as reviewRoute } from "./reviewRoute.js";

export const mountRoutes = (app) => {
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/category", categoryRoutes);
  app.use("/api/v1/reviews", reviewRoute);
};
