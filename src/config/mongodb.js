import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
let connection, db;

export const connectDB = async (database = "Users") => {
  try {
    if (!connection) {
      connection = await MongoClient.connect(url);
    }
    db = connection.db(database);
    console.log("Database connected successfully...");
  } catch (err) {
    console.log("Error connecting to database: ", err.message);
  }
};

export const getDB = async () => {
  if (!db) {
    throw new Error("Try connecting the database first...!");
  }
  return db;
};
