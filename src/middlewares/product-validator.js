import { body } from "express-validator";
import { ProductsModel } from "../resources/products/product-model.js";
export const validator = [
  body("name")
    .notEmpty()
    .isAlpha()
    .withMessage("Name should contain only alphabets and not numbers."),
  body("description")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("The description should be more than 15 characters."),
  body("category")
    .notEmpty()
    .isAlpha()
    .withMessage("Category cannot be empty and must contain alphabets."),
  body("category").custom((category) => {
    if (!ProductsModel.isValidCategory(category)) {
      throw new Error("Invalid category. Please select a valid category.");
    }
    return true;
  }),
  body("price")
    .isNumeric()
    .withMessage("Price should be a numeric value and not alphabets."),
  body("price").notEmpty().withMessage("Price cannot be empty."),
  body("imageUrl").isURL().withMessage("Please enter a valid URL"),
  body("sizes")
    .notEmpty()
    .withMessage("Sizes cannot be empty, must contain some sizes."),
  body("sizes").custom((sizes) => {
    if (!Array.isArray(sizes)) {
      throw new Error("Sizes should be an array of size values...");
    }
    if (!ProductsModel.isValidSize(sizes)) {
      throw new Error("One or More sizes are invalid!!!...");
    }
    return true;
  }),
];
