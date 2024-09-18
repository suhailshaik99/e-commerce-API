import { getDB } from "./../../config/mongodb.js";
import { AppError } from "../../utils/appError.js";
import { ObjectId } from "mongodb";
class UsersModel {
  static async getAllUsers() {
    try {
      const db = await getDB();
      const users = await db.collection("users").find().toArray();
      return users;
    } catch (err) {
      new AppError(err.message, 500);
    }
  }

  static async createUser(data) {
    try {
      const db = await getDB();
      const user = await db.collection("users").insertOne(data);
      return user;
    } catch (err) {
      new AppError(err.message, 400);
    }
  }

  static async deleteUser(id) {
    try {
      const db = await getDB();
      return await db.collection("users").findOneAndDelete({_id: new ObjectId(id)}, { projection: { password: 0 } }) ?? null;
    } catch (error) {
      new AppError(error.message, 400);
    }
  }

  static async getUserByEmail(email) {
    const db = await getDB();
    return (await db.collection("users").findOne({ email: email })) ?? null;
  }

  static async validateUserByCreds(email, password) {
    const db = await getDB();
    let user = await this.getUserByEmail(email);
    if(user.email === email && user.password === password) return user;
  }
}

export { UsersModel };
