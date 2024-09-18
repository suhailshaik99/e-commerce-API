import { ProductsModel } from "./product-model.js";
import { validationResult } from "express-validator";
import { AppError } from "../../utils/appError.js";
class ProductsController {
  static async getAllProducts(req, res, next) {
    try {
      const products = await ProductsModel.getAllProducts();
      if (products.length === 0)
        return next(
          new AppError(
            "No products found at this moment, Try again later...!",
            404
          )
        );
      res.status(200).json({
        success: true,
        results: products.length,
        data: products,
      });
    } catch (error) {
      next(new AppError(error.message, 500));
    }
  }
  // CREATE
  static async addProduct(req, res, next) {
    try {
      const errors = validationResult(req);
      // const msgs = errors.array().map(err => err.msg);
      if (!errors.isEmpty()) {
        return res.status(401).json({
          success: false,
          message: errors.array(),
        });
      }
      const product = await ProductsModel.addProduct(req.body);
      if (!product)
        return next(new AppError("Database Operation failed...", 500));
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      next(new AppError(error.message, 500));
    }
  }

  // READ
  static async getProductById(req, res, next) {
    try {
      const id = req.params.id;
      const product = await ProductsModel.getProductById(id);
      if (product.length === 0) {
        return next(
          new AppError("No product found with the mentioned Id...", 404)
        );
      }
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      next(new AppError(error.message, 500));
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
  static async updateProductById(req, res) {
    try {
      const productId = req.params.id;
      const newProduct = req.body;
      const product = await ProductsModel.getProductById(productId);
      if (!product)
        return next(
          new AppError("Product not found with the mentioned Id...!")
        );
      const updatedProduct = await ProductsModel.updateProductById(
        productId,
        newProduct
      );

      res.status(200).json({
        success: true,
        operation: "Product Updated Successfully.",
        updatedProduct,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // DELETE
  static async deleteProductById(req, res) {
    try {
      const productId = req.params.id;
      const product = await ProductsModel.deleteProductById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found with the mentioned Id.",
        });
      }
      res.status(200).json({
        success: true,
        operation: "Delete Successfull!",
        product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }

  // Rate Product
  static async rateProduct(req, res, next) {
    try {
      const { rating } = req.body;
      const product_id = req.params.id;
      const product = await ProductsModel.getProductById(product_id);

      if (product.length === 0) {
        return next(
          new AppError("No product found with the mentioned id...", 400)
        );
      }

      if (!Number.isInteger(rating * 1) || rating <= 0 || rating > 5) {
        return next(
          new AppError(
            "Rating should be an integer and should be a value between 1 to 5...",
            400
          )
        );
      }

      const ratedProduct = await ProductsModel.rateProduct(
        req.user.id,
        product_id,
        rating
      );

      if (!ratedProduct)
        return next(new AppError("Rating object operation failed..."));

      res.status(200).json({
        success: true,
        message: "Rating added to the product",
        product_info: ratedProduct,
      });
    } catch (error) {
      next(new AppError(error.message, 400));
    }
  }
}

export { ProductsController };
