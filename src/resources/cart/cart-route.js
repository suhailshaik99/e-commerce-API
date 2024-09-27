import expres from "express";
import CartController from "./cart-controller.js";
import { jwtAuthorizer } from "../../middlewares/JWT-authentication.js";
const router = expres.Router();

/**
 * @openapi
 * /api/carts/:
 *   get:
 *     summary: This Endpoint let's the user to add products to the cart.
 *     description: This endpoint expects product_id and the quantity of the product in the query string, just hit a GET request to the above URL with the required query strings and add product to the cart. Condition to be met is, the user must be authenticated.
 *     tags:
 *       - GET
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User must enter the productId.
 *       - in: query
 *         name: quantity
 *         required: true
 *         schema:
 *           type: integer
 *         description: User must enter the quantity to be added to the cart.
 *     responses:
 *       200:
 *         description: A successfull response with all good status.
 *       400:
 *         description: Bad request from the client.
 *       403:
 *         description: Forbidden request due to unauthorized access.
 *       500:
 *         description: Internal Server Error
 */

/**
 * @openapi
 * /api/carts/:
 *   delete:
 *     summary: This Endpoint let's the user to delete product(s) from the cart.
 *     description: This endpoint expects product_id in the query string, just hit a GET request to the above URL with the required query strings and delete product from the cart. Condition to be met is, the user must be authenticated.
 *     tags:
 *       - DELETE
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User should make sure to pass the product_id to delete the specific product from the cart.
 *     response:
 *       200:
 *         description: A successfull response with all good status.
 *       400:
 *         description: Bad request from the client.
 *       403:
 *         description: Forbidden request due to unauthorized access.
 *       500:
 *         description: Internal Server Error
 */
router
  .route("/")
  .get(CartController.getAllCarts)

/**
 * @openapi
 * /api/carts/cartItems:
 *   get:
 *     summary: This Endpoint let's the user retrieve all the items present in the cart.
 *     description: This endpoint doesn't expect any parameters, query strings in the URL, just hit a GET request to the above URL and view all the items of the cart. Condition to be met is, the user must be authenticated.
 *     tags:
 *       - GET
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successfull response with all good status.
 *       400:
 *         description: Bad request from the client.
 *       403:
 *         description: Forbidden request due to unauthorized access.
 *       500:
 *         description: Internal Server Error
 */
router.route("/mycart").get(jwtAuthorizer, CartController.getMyCart);
router.route("/:id").post(jwtAuthorizer, CartController.addToMyCart);

export { router };