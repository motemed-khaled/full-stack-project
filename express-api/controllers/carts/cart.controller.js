import AsyncHandler from "express-async-handler";
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
  const user = await userModel
    .findById(req.user.id)
    .populate({
      path: "cart",
      populate: { path: "productId", select: "id title imageCover quantity" },
    });
  let totalPrice = 0;
  user.cart.forEach((prod) => {
    totalPrice += prod.productId.price * prod.quantity;
  });
  res.status(200).json({ totalPrice, products: user.cart });
});
