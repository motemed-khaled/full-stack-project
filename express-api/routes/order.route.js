import { Router } from "express";
import * as O from "../controllers/orders/order.controller.js";
import * as V from "../utils/validators/order.validator.js";
import { auth as protect, allowedTo } from "../controllers/authController.js";

const router = Router();

router
  .route("/")
  .all(protect)
  .post(allowedTo("user"), V.createVal, O.create)
  .get(allowedTo("admin", "superadmin"), V.findVal, O.find);
  router
    .route("/revenu")
    .get(protect,allowedTo("admin", "superadmin"), V.revenuVal, O.CalcTotalRevenu);
  router.route('/me').get(protect, allowedTo('user'), O.userOrders)
router
  .route("/:orderId")
  .all(protect, allowedTo("admin", "superadmin"), V.orderIdParamVal)
  .get(O.findOne)
  .patch(V.updateVal, O.update);
export const orderRoutes = router;
