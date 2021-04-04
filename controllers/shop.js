const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/product-list", {
      path: "/products",
      prods: products,
      pageTitle: "All products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.find().then((products) => {
    res.render("shop/index", {
      path: "/",
      prods: products,
      pageTitle: "Shop",
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

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: user.cart.items,
      });
    });
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
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((error) => console.log("[GET ORDERS ERROR]", error));
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
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items.map((product) => {
        return {
          product: { ...product.productId._doc },
          quantity: product.quantity,
        };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then(() => req.user.clearCart())
    .then(() => res.redirect("/orders"))
    .catch((error) => console.log("[POST ORDER ERROR]", error));
};
