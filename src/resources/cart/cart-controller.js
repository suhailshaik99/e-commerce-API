import { ProductsModel } from "../products/product-model.js";
import CartModel from "./cart-model.js";
export default class CartController {
  static deleteCartItems(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.query;
      // console.log(userId, productId);
      const result = CartModel.deleteCartItems(userId, productId);
      // console.log(result);
      if (!result) {
        return res.status(400).json({
          success: false,
          message: "No Products found with the mentioned productId...",
        });
      }
      res.status(200).json({
        success: true,
        message: "Product(s) deleted successfully...!"
      })
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }

  static getAllCartItems(req, res) {
    try {
      const allItems = CartModel.getAllItems();
      if (!allItems) {
        return res.status(400).json({
          success: false,
          message:
            "The cart is empty, add products to the cart before you view them..",
        });
      }
      res.status(200).json({
        success: true,
        message: "Cart Items Fetched successfully...",
        items: allItems,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }

  static addProductToCart(req, res) {
    try {
      const userId = req.user.id;
      const { product_id, quantity } = req.query;
      const findProduct = ProductsModel.getProductById(product_id);
      if (!findProduct) {
        return res.status(400).json({
          success: false,
          message: "The product that you are trying to add doesn't exists...",
        });
      }
      CartModel.addProductToCart(userId, product_id * 1, quantity);
      res.status(200).json({
        success: true,
        message: "Product added to cart successfully...!",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
}
