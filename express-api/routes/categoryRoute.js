const { Router } = require("express");
const {
  getCategoryValidator,
  creatCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");
const {
  creatCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
import {
  auth as protectRoute,
  allowedTo,
} from "../controllers/authController.js";

export const router = express.Router();

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
