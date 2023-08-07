import { Router } from "express";
import * as P from "../controllers/products/product.controller.js";
import * as Val from "../utils/validators/products.validator.js";
import { auth as protect, allowedTo } from "../controllers/authController.js";
import { singleImgMiddleware } from "../middleware/multer.middleware.js";
import { addProductToCart } from "../controllers/carts/cart.controller.js";

const router = Router();

router
  .route("/") 
  .get(P.findAll)
  .post(
    protect,
    allowedTo("admin", "superadmin"),
    singleImgMiddleware("uploads/products", "imageCover"),
    Val.createVal,
    P.create
  );
router.route("/best").get(P.bestSoldProducts);
router
  .route("/statistics")
  .get(
    protect,
    allowedTo("admin", "superadmin"),
    Val.statisticsVal,
    P.soldProductsCount
  );
router
  .route("/:productId")
  .all(Val.productIdParamVal)
  .get(P.findOne)
  .patch(
    protect,
    allowedTo("admin", "superadmin"),
    singleImgMiddleware("uploads/products", "imageCover"),
    Val.updateVal,
    P.update
  )
  .delete(protect, allowedTo("admin", "superadmin"), P.remove)

export const productsRoutes = router;
