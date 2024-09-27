import CartModel from "./cart-model.js";
import { AppError } from "../../utils/appError.js";
export default class CartController {
  static async getAllCarts(req, res, next) {
    const carts = await CartModel.getAllCarts();
    if (carts.length === 0)
      return next(new AppError("No carts yet by the users..", 404));
    res.status(200).json({
      success: true,
      message: "Carts Fetched...!",
      carts,
    });
  }

  static async getMyCart(req, res, next) {
    const mycart = await CartModel.getMyCart(req.user.id);
    if (!mycart)
      return next(
        new AppError(
          "Your Cart is Empty...! Try adding some products to your cart..",
          404
        )
      );
    res.status(200).json({
      success: true,
      message: "Cart fetched successfully..",
      mycart,
    });
  }

  static async addToMyCart(req, res, next) {
    try {
      const productId = req.params.id;
      const userId = req.user.id;
      const {quantity} = req.body;
      const addedItem = await CartModel.addToMyCart(
        userId,
        productId,
        quantity
      );
      res.status(201).json({
        success: true,
        message: "Product added to cart successfully..",
        addedItem,
      });
    } catch (error) {
      next(new AppError(error.message, 500));
    }
  }
}
