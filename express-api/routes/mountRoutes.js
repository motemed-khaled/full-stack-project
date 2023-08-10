import { router as userRoutes } from "./userRoutes.js";
import { router as authRoutes } from "./authRoutes.js";
import { router as categoryRoutes } from "./categoryRoute.js";
import { router as reviewRoute } from "./reviewRoute.js";
import { productsRoutes } from "./products.route.js";
import { cartRoutes } from "./cart-routes.js";
import { orderRoutes } from "./order.route.js";

export const mountRoutes = (app) => {
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/category", categoryRoutes);
  app.use("/api/v1/reviews", reviewRoute);
  app.use("/api/v1/products", productsRoutes);
  app.use("/api/v1/cart", cartRoutes);
  app.use("/api/v1/order", orderRoutes);
};
