import express from "express";
import { ProductsController } from "./product-controller.js";
import { validator } from "../../middlewares/product-validator.js";
import { jwtAuthorizer } from "../../middlewares/JWT-authentication.js";
const router = express.Router();
/**
 * @openapi
 * /api/products/:
 *   get:
 *     summary: An Endpoint to retrieve all the available products.
 *     description: This endpoint requires no additional parameters nor any query string. Simply hit a GET request on the mentioned endpoint and get to see all the available products.
 *     tags:
 *       - GET
 *     responses:
 *       200:
 *         description: A successfull response with all good status.
 *       403:
 *         description: Forbidden Request.
 *       404:
 *         description: No Products found.
 */

/**
 * @openapi
 * /api/products/:
 *   post:
 *     summary: An Endpoint to post a new product.
 *     description: This endpoint enables the user to post a new product. This endpoint expects a JSON body which contains all the required details to post a new product.
 *     tags:
 *       - POST
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: This endpoint expects a JSON object in the request body to add a new product to the available list.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product (No whitespaces are allowed)
 *                 example: "SamsungSmartTV"
 *               description:
 *                 type: string
 *                 description: Description of the product. Should be 40 characters long. (No whitespaces are allowed)
 *                 example: "Samsung brings the all-new smart QLED TV. It powers you with all the new AI features."
 *               category:
 *                 type: string
 *                 description: Category for the product. (No whitespaces are allowed)
 *                 example: "Electronics"
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *                 example: 1500
 *               imageUrl:
 *                 type: string
 *                 description: A proper URL of the image should be passed.
 *                 example: "image-tv.png"
 *               sizes:
 *                 type: array
 *                 description: Available sizes for the product.
 *                 items:
 *                   type: string
 *                   example: "s"
 *     responses:
 *       200:
 *         description: A successful response with status 200.
 *       403:
 *         description: Forbidden Request due to unauthorized access.
 *       404:
 *         description: Bad Request due to incorrect user input.
 *       500:
 *         description: Internal Server Error.
 */
router
  .route("/")
  .get(ProductsController.getAllProducts)
  .post(jwtAuthorizer, validator, ProductsController.addProduct);

/**
 * @openapi
 * /api/products/filter/:
 *   get:
 *     summary: An Endpoint to retrieve all the products with the applied filter.
 *     description: This endpoint requires the query parameters in the URL which will describes the filters such as the minPrice, maxPrice, category and other available filters.
 *     tags:
 *       - GET
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: integer
 *         description: It requires the minimum price to be entered by the user.
 *         example: "1000"
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *         description: It requires the maximum price to be entered by the user.
 *         example: "5000"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: It requires the category to be mentioned by the user.
 *         example: "Footwear"
 *     responses:
 *       200:
 *         description: A successfull response with all good status.
 *       404:
 *         description: Bad request from the user.
 *       500:
 *         description: Internal Server Error.
 */
router.get("/filter", ProductsController.getProductsByFilter); // More Specific

/**
 * @openapi
 * /api/products/rateProduct:
 *   post:
 *     summary: An Endpoint to rate a product.
 *     description: This endpoint enables the user to post a new product. This endpoint expects a JSON body which contains all the required details to post a new product.
 *     tags:
 *       - POST
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: This endpoint expects a JSON object in the request body to rate a product from the available list of products.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: The id of the product.
 *                 example: 4
 *               rating:
 *                 type: integer
 *                 description: Rating to be posted for the mentioned product id.
 *                 example: 10
 *     responses:
 *       200:
 *         description: A successful response with status 200.
 *       403:
 *         description: Forbidden Request due to unauthorized access.
 *       404:
 *         description: Bad Request due to incorrect user input.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/rateProduct/:id", jwtAuthorizer, ProductsController.rateProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: An Endpoint to update specific product from the available products.
 *     description: This endpoint requires product_id as parameter. Simply hit a GET request on the mentioned endpoint with a product_id and get to see specific product from the available products.
 *     tags:
 *       - GET
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User is required to pass the Id of the product in the URL
 *     responses:
 *       200:
 *         description: A successfull response with all good status.
 *       403:
 *         description: Forbidden Request.
 *       404:
 *         description: No Products found.
 */

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     summary: An Endpoint to update a product.
 *     description: This endpoint requires product_id as parameter. Simply hit a PUT request on the mentioned endpoint with a product_id and update a specific product from the available products.
 *     tags:
 *       - PUT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User is required to pass the Id of the product in the URL
 *     requestBody:
 *       required: true
 *       description: This endpoint expects a JSON object in the request body to update a specific product from the available list.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product (No whitespaces are allowed)
 *                 example: "SamsungSmartTV"
 *               description:
 *                 type: string
 *                 description: Description of the product. Should be 40 characters long. (No whitespaces are allowed)
 *                 example: "Samsung brings the all-new smart QLED TV. It powers you with all the new AI features."
 *               category:
 *                 type: string
 *                 description: Category for the product. (No whitespaces are allowed)
 *                 example: "Electronics"
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *                 example: 1500
 *               imageUrl:
 *                 type: string
 *                 description: A proper URL of the image should be passed.
 *                 example: "image-tv.png"
 *               sizes:
 *                 type: array
 *                 description: Available sizes for the product.
 *                 items:
 *                   type: string
 *                   example: "s"
 *     responses:
 *       200:
 *         description: A successfull response with all good status.
 *       403:
 *         description: Forbidden Request.
 *       404:
 *         description: No Products found.
 */

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: An Endpoint to delete specific product from the available products.
 *     description: This endpoint requires product_id as parameter. Simply hit a DELETE request on the mentioned endpoint with a product_id.
 *     tags:
 *       - DELETE
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User is required to pass the Id of the product in the URL
 *     responses:
 *       200:
 *         description: A successfull response with all good status.
 *       403:
 *         description: Forbidden Request.
 *       404:
 *         description: No Products found.
 */
router
  .route("/:id") // Generic
  .get(ProductsController.getProductById)
  .put(validator, ProductsController.updateProductById)
  .delete(jwtAuthorizer, ProductsController.deleteProductById);

export { router };
