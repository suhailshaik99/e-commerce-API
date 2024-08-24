import express from "express";
import dotenv from "dotenv";
import path from "path";
import { router as productRouter } from "./src/resources/products/product-route.js";
import {router as userRouter} from "./src/resources/users/users-route.js";

dotenv.config({path: path.resolve(".env")});

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(3000, () => console.log("App is listening on port: 3000"));
