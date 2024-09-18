import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
class ProductsModel {
  static async getAllProducts() {
    const db = await getDB();
    const products = await db.collection("products").find({}).toArray();
    return products;
  }

  static async getProductById(id) {
    const db = await getDB();
    return (
      (await db.collection("products").findOne({ _id: new ObjectId(id) })) ??
      null
    );
  }

  static async addProduct(product) {
    const db = await getDB();
    const insertedProduct = await db.collection("products").insertOne(product);
    if (insertedProduct.acknowledged) return product;
    return false;
  }

  static async rateProduct(userId, productId, rating) {
    const db = await getDB();
    const ratingObj = { userId: new ObjectId(userId), rating };
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });
    const user = product?.ratings?.find((product) => product.userId == userId);
    if (!user) {
      return await db
        .collection("products")
        .findOneAndUpdate(
          { _id: new ObjectId(productId) },
          { $push: { ratings: ratingObj } },
          { upsert: true, returnDocument: "after" }
        );
    }
    return await db.collection("products").findOneAndUpdate(
      {
        _id: new ObjectId(productId),
        "ratings.userId": new ObjectId(userId),
      },
      {
        $set: { "ratings.$.rating": rating },
      },
      { returnDocument: "after" }
    );
  }

  static getProductsByFilter(minPrice, maxPrice, category) {
    const products = this.getAllProducts();
    const results = products.filter((item) => {
      if (
        item.price >= minPrice &&
        item.price <= maxPrice &&
        item.category === category
      ) {
        return true;
      }
      return false;
    });
    return results;
  }

  static async updateProductById(productId, product) {
    const db = await getDB();
    const newProduct = await db
      .collection("products")
      .findOneAndUpdate(
        { _id: new ObjectId(productId) },
        { $set: product },
        { returnDocument: "after" }
      );
    return newProduct;
  }

  static async deleteProductById(productId) {
    const db = await getDB();
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });
    if (!product) return null;
    return await db
      .collection("products")
      .findOneAndDelete({ _id: new ObjectId(productId) });
  }

  static isValidCategory(category) {
    return categories.includes(category);
  }

  static isValidSize(size) {
    return size.every((data) => sizes.includes(data));
  }
}

const categories = ["Footwear", "Clothing", "Electronics", "HomeNeeds"];
const sizes = ["S", "s", "M", "m", "L", "l", "XL", "xl", "XXL", "xxl"];

export { ProductsModel };
