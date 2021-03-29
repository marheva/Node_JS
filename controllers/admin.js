const mongodb = require("mongodb");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render("admin/products", {
      path: "/admin/products",
      prods: products,
      pageTitle: "Admin products",
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === "true";

  if (!editMode) {
    return res.redirect("/");
  }
  const productById = req.params.productId;

  Product.findById(productById).then((product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body;
  const product = new Product(null, title, imageURL, price, description, req.user._id);
  product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageURL, price, description } = req.body;
  const updatedProduct = new Product(mongodb.ObjectID(productId), title, imageURL, price, description);
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId).then((result) => {
    res.redirect("/admin/products");
  });
};
