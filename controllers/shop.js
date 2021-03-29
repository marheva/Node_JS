const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render("shop/product-list", {
      path: "/products",
      prods: products,
      pageTitle: "All products",
    });
  });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId).then((product) => {
    res.render("shop/product-detail", {
      path: "/products",
      product: product,
      pageTitle: product.title,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render("shop/index", {
      path: "/",
      prods: products,
      pageTitle: "Shop",
    });
  });
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then((cartProducts) => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cartProducts,
    });
  });
};

exports.postProductToCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
      console.log("[CART RESULT ADD]", result);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .deleteItemFromCart(productId)
    .then((result) => {
      return res.redirect("/cart");
    })
    .catch((error) => console.log("[CART DELETE PRODUCT ERROR]", error));
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then((result) => {
      return res.redirect("/orders");
    })
    .catch((error) => console.log("[POST ORDER ERROR]", error));
};

exports.getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/checkout", {
      path: "/checkout",
      pageTitle: "Checkout",
    });
  });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((error) => console.log("[GET ORDERS ERROR]", error));
};
