import express from "express";
import { UsersController } from "./users-controller.js";
import { signInValidator } from "../../middlewares/signin-validator.js";
import { signUpValidator } from "../../middlewares/singup-validator.js";
const router = express.Router();

/**
 * @openapi
 * /api/users/signin/:
 *   post:
 *     summary: An Endpoint enabling the user to sign in.
 *     description: This endpoint allows the user to sign in to the application with their credentials. This endpoint expects a JSON object containing the user's email and password.
 *     tags:
 *       - POST
 *     requestBody:
 *       required: true
 *       description: Expects the user's email and password in the request body.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: "johndoe@gmail.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "yourpassword"
 *     responses:
 *       200:
 *         description: A successful response with status 200.
 *       404:
 *         description: Bad request from the client.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/signin", signInValidator, UsersController.signIn);

/**
 * @openapi
 * /api/users/signup/:
 *   post:
 *     summary: An Endpoint enabling the user to sign up.
 *     description: This endpoint allows the user to sign up to the application with their data. This endpoint expects a JSON object containing the user's name, email and password.
 *     tags:
 *       - POST
 *     requestBody:
 *       required: true
 *       description: Expects the user's data in the request body.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Enter the user's name.
 *                 example: "john doe"
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: "johndoe@gmail.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "yourpassword"
 *     responses:
 *       200:
 *         description: A successful response with status 200.
 *       404:
 *         description: Bad request from the client.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/signup", signUpValidator, UsersController.signUp);

export { router };
