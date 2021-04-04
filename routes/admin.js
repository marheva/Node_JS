const express = require("express");
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = require("../controllers/admin");

// MIDDLEWARE
//
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/add-product", isAuth, getAddProduct);
router.get("/products", isAuth, getProducts);
router.get("/edit-product/:productId", getEditProduct);

router.post("/add-product", isAuth, postAddProduct);
router.post("/edit-product", isAuth, postEditProduct);
router.post("/delete-product", isAuth, postDeleteProduct);

module.exports = router;
