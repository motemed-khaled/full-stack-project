import { Router } from "express";
import * as P from "../controllers/products/product.controller.js";
import * as Val from "../utils/validators/products.validator.js";

const router = Router();

router.route("/").get(P.findAll).post(Val.createVal, P.create);
router.route("/best").get(P.bestSoldProducts);
router.route("/statistics").get(Val.statisticsVal, P.soldProductsCount);
router
  .route("/:productId")
  .all(Val.productIdParamVal)
  .get(P.findOne)
  .patch(Val.updateVal, P.update)
  .delete(P.remove);

export const productsRoutes = router;
