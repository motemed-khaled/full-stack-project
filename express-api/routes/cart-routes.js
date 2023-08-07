import { Router } from "express";
import * as C from "../controllers/carts/cart.controller.js";
import * as V from "../utils/validators/cart.validator.js";
import { auth as protect, allowedTo } from "../controllers/authController.js";

const router = Router();

router
  .route("/")
  .all(protect, allowedTo("user"))
  .post(V.addProductVal, C.addProductToCart)
  .get(allowedTo("user"), C.getCartProducts)
  .delete(V.removeProductVal, C.removeProductCart);

export const cartRoutes = router;
