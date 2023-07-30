import AsyncHandler from "express-async-handler";
import { productModel } from "../../models/product_model.js";
import { ApiError } from "../../utils/api_errors.js";

export const create = AsyncHandler(async (req, res) => {
  console.log(req.body);
  await productModel.create(req.body);
  res.status(201).json();
});

export const findOne = AsyncHandler(async (req, res) => {
  res
    .status(200)
    .json((await productModel.findById(req.params.productId)) || {});
});

export const findAll = AsyncHandler(async (req, res) => {
  let { limit, page, search } = req.query;
  search = search || "";
  limit = +(limit || 10);
  page = +(page || 1);
  const skip = limit * (page - 1);

  const totalCount = await productModel
    .count()
    .where({ title: { $regex: search } });
  const products = await productModel
    .find({ title: { $regex: search } })
    .limit(limit)
    .skip(skip);
  res.status(200).json({ totalCount, products });
});

export const update = AsyncHandler(async (req, res, next) => {
  const product = await productModel.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { runValidators: true }
  );
  if (!product) return next(new ApiError("cannot update this product", 400));
  res.status(200).json();
});

export const remove = AsyncHandler(async (req, res, next) => {
  const product = await productModel.findByIdAndRemove(req.params.productId);
  if (!product) next(new ApiError("cannot delete this product", 400));
  res.status(204).json();
});

export const bestSoldProducts = AsyncHandler(async (req, res) => {
  let { limit, page } = req.query;
  limit = +(limit || 10);
  page = +(page || 1);
  const skip = limit * (page - 1);

  const totalCount = await productModel
    .find()
    .where({ sold: { $gt: 0 } })
    .count();
  const products = await productModel
    .find()
    .where({ sold: { $gt: 0 } })
    .sort([
      ["sold", "desc"],
      ["ratingsAverage", "desc"],
    ])
    .limit(limit)
    .skip(skip);
  res.status(200).json({ totalCount, products });
});

export const soldProductsCount = AsyncHandler(async (req, res) => {
  const { start, end } = req.query;
  const queryFilter = {};
  if (start && end)
    queryFilter["createdAt"] = { $gte: new Date(start), $lte: new Date(end) };

  const productsCount = await productModel
    .find(queryFilter)
    .where({ sold: { $gt: 0 } })
    .count();

  const soldCount = await productModel.aggregate([
    { $match: queryFilter },
    { $group: { _id: null, total: { $sum: "$sold" } } },
  ]);

  res
    .status(200)
    .json({
      productsCount,
      soldCount: soldCount.length > 0 ? soldCount[0].total : 0,
    });
});
