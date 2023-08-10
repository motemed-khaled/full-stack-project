import { Router } from "express";
import * as V from "../utils/validators/categoryValidator.js";
import * as C from "../controllers/categoryController.js";

import { auth as protect, allowedTo } from "../controllers/authController.js";

export const router = Router();

router
  .route("/")
  .post(
    protect,
    allowedTo("superAdmin", "admin"),
    V.creatCategoryValidator,
    C.creatCategory
  )
  .get(C.getCategories);

router
  .route("/:id")
  .all(protect)
  .get(V.getCategoryValidator, C.getCategory)
  .put(
    allowedTo("superAdmin", "admin"),
    V.updateCategoryValidator,
    C.updateCategory
  )
  .delete(
    allowedTo("superAdmin", "admin"),
    V.deleteCategoryValidator,
    C.deleteCategory
  );
