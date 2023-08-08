import AsyncHandler from "express-async-handler";
import { orderModel } from "../../models/order-model.js";
import { productModel } from "../../models/product_model.js";
import { userModel } from "../../models/userModel.js";
import { ApiError } from "../../utils/api_errors.js";

export const create = AsyncHandler(async (req, res, next) => {
  const cart = await getUserCart(req, next);
  let totalPrice = await calcTotalCartPrice(cart, next);

  const order = await orderModel.create({
    userId: req.user.id,
    products: req.user.cart,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice: totalPrice,
  });
  if (!order) return new ApiError("", 400);
  req.user.cart = [];
  await req.user.save();
  res.status(201).json();
});

export const userOrders = AsyncHandler(async (req, res) => {
  res
    .status(200)
    .json(
      await orderModel
        .find({ userId: req.user.id })
        .sort([["createdAt", "desc"]])
    );
});

export const find = AsyncHandler(async (req, res) => {
  const totalCount = await orderModel.find(req.body.queryFilter).count();
  const orders = await orderModel
    .find(req.body.queryFilter)
    .sort([['createdAt', 'desc']])
    .limit(req.query.limit)
    .skip((req.query.page - 1) * req.query.limit);
  res.status(200).json({totalCount, orders});
});

export const findOne = AsyncHandler(async (req, res) => {
  res.status(200).json((await orderModel.findById(req.params.orderId)) || {});
});

export const update = AsyncHandler(async (req, res) => {
  await orderModel.findByIdAndUpdate(req.params.orderId, req.body);
  res.status(200).json();
});

export const CalcTotalRevenu = AsyncHandler(async (req, res) => {
  const { start, end } = req.query;
  const queryFilter = { isPaid: true };
  if (start && end)
    queryFilter["createdAt"] = { $gte: new Date(start), $lte: new Date(end) };

  const totalRevenu = await orderModel.aggregate([
    { $match: queryFilter },
    { $group: { _id: null, total: { $sum: "$totalOrderPrice" } } },
  ]);

  res
    .status(200)
    .json({ totalRevenu: totalRevenu.length > 0 ? totalRevenu[0].total : 0 });
});

// calculate total price and decrease quantity for each product
// throw error in case of over stock quantity
const calcTotalCartPrice = async (cart, next) => {
  let totalPrice = 0;
  cart.forEach(async (prod) => {
    totalPrice += prod.productId.price * prod.quantity;
    if (prod.productId.quantity < prod.quantity)
      return next(
        new ApiError(
          prod.productId.quantity > 0
            ? `${prod.productId.title} has only ${prod.productId.quantity} in stock`
            : `${prod.productId.title} is out of stock`
        )
      );
    await productModel.findByIdAndUpdate(prod.productId.id, {
      quantity: prod.productId.quantity - prod.quantity,
    });
  });

  return totalPrice;
};

const getUserCart = async (req, next) => {
  const user = await userModel
    .findById(req.user.id)
    .populate({ path: "cart", populate: "productId" });
  if (user.cart.length < 1) return next(new ApiError("empty cart", 400));
  return user.cart;
};
