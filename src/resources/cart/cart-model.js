import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class CartModel {
  static async getAllCarts() {
    const db = await getDB();
    return (await db.collection("carts").find({}).toArray()) ?? null;
  }
  static async getMyCart(userId) {
    const db = await getDB();
    return (
      (await db
        .collection("carts")
        .findOne({ userId: new ObjectId(userId) })) ?? null
    );
  }

  static async addToMyCart(userId, productId, quantity) {
    const db = await getDB();
    const userCart = await db.collection("carts").findOne({
      userId: new ObjectId(userId),
    });
    const productExist = await db.collection("carts").findOne({
      userId: new ObjectId(userId),
      "products.productId": new ObjectId(productId),
    });
    if (!userCart) {
      const addedItem = await db.collection("carts").insertOne({
        userId: new ObjectId(userId),
        products: [
          {
            productId: new ObjectId(productId),
            quantity,
          },
        ],
      });
      return addedItem;
    }

    if (!productExist) {
      return await db
        .collection("carts")
        .findOneAndUpdate(
          { userId: new ObjectId(userId) },
          {
            $push: {
              products: { productId: new ObjectId(productId), quantity },
            },
          },
          {
            upsert: true,
            returnDocument: "after",
          }
        );
    }
    return await db.collection("carts").findOneAndUpdate(
      {
        userId: new ObjectId(userId),
        "products.productId": new ObjectId(productId),
      },
      { $inc: { "products.$.quantity": quantity } },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
  }
}
