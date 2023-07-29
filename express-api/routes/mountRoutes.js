

import { router as userRoutes } from "./userRoutes.js";
import { router as authRoutes } from "./authRoutes.js";



export const mountRoutes = (app) => {
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/auth", authRoutes);
};