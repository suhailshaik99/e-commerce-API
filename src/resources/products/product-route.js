import express from "express";
import { ProductsController } from "./product-controller.js";
import { validator } from "../../middlewares/product-validator.js";
import { basicAuthoriser } from "../../middlewares/basic-authentication.js";
import { jwtAuthorizer } from "../../middlewares/JWT-authentication.js";
const router = express.Router();

router
  .route("/")
  .get(jwtAuthorizer, ProductsController.getAllProducts)
  .post(jwtAuthorizer, validator, ProductsController.addProduct);

router.get("/filter", ProductsController.getProductsByFilter); // More Specific
router.post("/rateProduct", jwtAuthorizer, ProductsController.rateProduct);

router
  .route("/:id") // Generic
  .get(ProductsController.getProductById)
  .put(validator, ProductsController.updateProductById)
  .delete(ProductsController.deleteProductById);

export { router };