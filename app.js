import express from "express";
import productRoutes from "./src/routes/productRoute.js";

const app = express();

//middlewares
app.use(express.json())

app.use("/api/v1", productRoutes);

export default app;
