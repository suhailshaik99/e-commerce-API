import express from "express";
import dotenv from "dotenv";
import path from "path";
import { router as productRouter } from "./src/resources/products/product-route.js";
import { router as userRouter } from "./src/resources/users/users-route.js";
import { router as cartRouter } from "./src/resources/cart/cart-route.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpecs from "./src/utils/swagger.js";
import { globalHandler } from "./src/middlewares/globalErrorHandler.js";

dotenv.config({ path: path.resolve(".env") });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/carts", cartRouter);

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.get("/api/docs.json", (req, res) => {
  res.setHeader("content-type", "application/json");
  res.send(swaggerSpecs);
});

app.use(globalHandler);

app.listen(3000, () => console.log("App is listening on port: 3000"));
