import expres from "express";
import { jwtAuthorizer } from "../../middlewares/JWT-authentication.js";
import CartController from "./cart-controller.js";
const router = expres.Router();

router.route("/").get(jwtAuthorizer, CartController.addProductToCart).delete(jwtAuthorizer, CartController.deleteCartItems);
router.route("/cartItems").get(jwtAuthorizer, CartController.getAllCartItems);

export {router};