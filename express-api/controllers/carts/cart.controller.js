import AsyncHandler from "express-async-handler";
import { productModel } from "../../models/product_model.js";
import { ApiError } from "../../utils/api_errors.js";
import { userModel } from "../../models/userModel.js";

export const addProductToCart = AsyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  req.user.cart.push({ productId, quantity });
  await req.user.save();
  res.status(200).json();
});

export const removeProductCart = AsyncHandler(async (req, res) => {
  await userModel.findByIdAndUpdate(req.user.id, {
    $pull: { cart: { productId: req.body.productId } },
  });
  res.status(204).send();
});

export const getCartProducts = AsyncHandler(async (req, res) => {
  res.status(200).json(req.user.cart);
});
