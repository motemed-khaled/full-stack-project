

import { router as userRoutes } from "./userRoutes.js";
import { router as authRoutes } from "./authRoutes.js";
import { productsRoutes } from "./products.route.js";



export const mountRoutes = (app) => {
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/products", productsRoutes)
};