import { Router } from "express";
import {
  getCategoryValidator,
  creatCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../utils/validators/categoryValidator.js";
import {

  creatCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import {
  auth as protectRoute,
  allowedTo,
} from "../controllers/authController.js";

export const router = Router();

router.use(protectRoute);

router.post(
  "/creatCategory",
  allowedTo("superAdmin", "admin"),
  creatCategoryValidator,
  creatCategory
);
router.get("/getCategories", getCategories);
router.get("/getCategoryById/:id", getCategoryValidator, getCategory);
router.put(
  "/updateCategory/:id",
  allowedTo("superAdmin", "admin"),
  updateCategoryValidator,
  updateCategory
);
router.delete(
  "/deleteCategory/:id",
  allowedTo("superAdmin", "admin"),
  deleteCategoryValidator,
  deleteCategory
);
