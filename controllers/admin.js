const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.find().then((products) => {
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

// [POST]
//
exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body;
  const product = new Product({
    title: title,
    imageURL: imageURL,
    price: price,
    description: description,
    userId: req.user,
  });

  product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageURL, price, description } = req.body;
  Product.findById(productId)
    .then((product) => {
      product.title = title;
      product.imageURL = imageURL;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then(() => {
      console.log(`[PRODUCT ID:${productId} WAS EDITED]`);
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(`[PRODUCT ID:${productId} WAS NOT UPDATED], error message: ${error}`));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByIdAndRemove(productId).then(() => {
    res.redirect("/admin/products");
  });
};
