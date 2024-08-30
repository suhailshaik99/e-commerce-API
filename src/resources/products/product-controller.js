import { ProductsModel } from "./product-model.js";
import { validationResult } from "express-validator";
import { UsersModel } from "../users/users-model.js";
class ProductsController {
  static getAllProducts(req, res) {
    try {
      const products = ProductsModel.getAllProducts();
      res.status(200).json({
        success: true,
        results: products.length,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: "Internal Server Error",
      });
    }
  }
  // CREATE
  static addProduct(req, res) {
    const errors = validationResult(req);
    // const msgs = errors.array().map(err => err.msg);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        success: false,
        message: errors.array(),
      });
    }
    const product = ProductsModel.addProduct(req.body);
    res.status(200).json({
      success: true,
      data: product,
    });
  }

  // READ
  static getProductById(req, res) {
    try {
      const id = req.params.id;
      if (Number.isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Product Id.",
        });
      }
      const product = ProductsModel.getProductById(id);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product not found with the mentioned Id.",
        });
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  // Read Products By Filter
  static getProductsByFilter(req, res) {
    try {
      let { minPrice, maxPrice, category } = req.query;
      (minPrice = Number(minPrice)), (maxPrice = Number(maxPrice));

      if (Number.isNaN(minPrice) || minPrice <= 0) {
        return res.status(404).json({
          success: false,
          message: "Min Price should be a valid number and greater than 0",
        });
      }

      if (Number.isNaN(maxPrice) || maxPrice <= 0) {
        return res.status(404).json({
          success: false,
          message: "Max Price should be a valid number and greater than 0",
        });
      }

      if (minPrice > maxPrice) {
        return res.status(404).json({
          success: false,
          message: "Min price cannot be greater than Max price.",
        });
      }

      if (!category || !ProductsModel.isValidCategory(category)) {
        return res.status(404).json({
          success: false,
          message: "Invalid Category",
        });
      }

      const products = ProductsModel.getProductsByFilter(
        minPrice,
        maxPrice,
        category
      );
      if (products.length > 0) {
        return res.status(200).json({
          success: true,
          results: products.length,
          data: products,
        });
      } else {
        return res.status(200).json({
          success: true,
          results: products.length,
          data: "No Products found with the filter applied!...",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error!!..",
      });
    }
  }

  // UPDATE
  static updateProductById(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      });
    }
    try {
      const id = req.params.id;
      if (Number.isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Product Id.",
        });
      }
      const product = ProductsModel.updateProductById(req.body, id);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product not found with the mentioned Id.",
        });
      }
      res.status(200).json({
        success: true,
        operation: "Product Updated Successfully.",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  // DELETE
  static deleteProductById(req, res) {
    try {
      const id = req.params.id;
      if (Number.isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Product Id.",
        });
      }
      const product = ProductsModel.deleteProductById(id);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product not found with the mentioned Id.",
        });
      }
      res.status(200).json({
        success: true,
        operation: "Delete Successfull!",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  // Rate Product
  static rateProduct(req, res) {
    try {
      const { product_id, rating } = req.body;
      const product = ProductsModel.getProductById(product_id);
      if(!product) {
        return res.status(400).json({
          success: false,
          message: "No product found with the mentioned id..."
        })
      }
      if(!Number.isInteger(rating)){
        return res.status(400).json({
          success: false,
          message: "Rating should be an integer and not a float value..."
        })
      }
      const ratedProduct = ProductsModel.rateProduct(req.user.id, product_id, rating);
      // const user = UsersModel.getUserById(req.user.id);
      // if(!user) {
      //   return res.status(400).json({
      //     success: false,
      //     message: 'No user found with the mentioned userId..'
      //   })
      // }
      res.status(200).json({
        success: true,
        message: "Rating added to the product",
        product_info: ratedProduct
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
}

export { ProductsController };
