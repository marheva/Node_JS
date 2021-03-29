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

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:productId", getProductById);

router.get("/cart", getCart);
router.post("/cart", postProductToCart);
router.post("/cart-delete-item", postCartDeleteProduct);

router.post("/create-order", postOrder);
router.get("/orders", getOrders);

// router.get("/checkout", getCheckout);

module.exports = router;
