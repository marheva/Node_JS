const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body;
  const product = new Product(null, title, imageURL, price, description);
  product.save();
  res.redirect("/");
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageURL, description } = req.body;
  const updatedProduct = new Product(productId, title, price, imageURL, description);
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit === "true";

  if (!editMode) {
    return res.redirect("/");
  }
  const productById = req.params.productId;
  Product.findById(productById, (product) => {
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

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      path: "/admin/products",
      prods: products,
      pageTitle: "Admin products",
    });
  });
};
