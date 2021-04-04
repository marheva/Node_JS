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

// MIDDLEWARE
//
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// [PRODUCT]
router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:productId", getProductById);
// [CART]
router.get("/cart", isAuth, getCart);
router.post("/cart", isAuth, postProductToCart);
router.post("/cart-delete-item", isAuth, postCartDeleteProduct);
// [ORDER]
router.post("/create-order", isAuth, postOrder);
router.get("/orders", isAuth, getOrders);

module.exports = router;
