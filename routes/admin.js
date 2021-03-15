const express = require("express");
const { getAddProduct, postAddProduct, getProducts, getEditProduct, postEditProduct } = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", getAddProduct);
router.get("/products", getProducts);
router.get("/edit-product/:productId", getEditProduct);

router.post("/add-product", postAddProduct);
router.post("/edit-product", postEditProduct);

module.exports = router;
