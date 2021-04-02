const express = require("express");
const {
  getProducts,
  getProductById,
  getIndex,
  getCart,
  getCheckout,
  postOrder,
  getOrders,
  postProductToCart,
  postCartDeleteProduct,
} = require("../controllers/shop");

const router = express.Router();

// [PRODUCT]
router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:productId", getProductById);
// [CART]
router.get("/cart", getCart);
router.post("/cart", postProductToCart);
router.post("/cart-delete-item", postCartDeleteProduct);
// [ORDER]
router.post("/create-order", postOrder);
router.get("/orders", getOrders);

module.exports = router;
