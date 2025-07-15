import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getAllProducts).post(createProduct);
router.get("/products/:id", getProductById);


export default router;