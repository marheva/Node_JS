// const fs = require("fs");
// const path = require("path");
// const filePath = path.join(path.dirname(require.main.filename), "data", "cart.json");

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     // Fetch the previous cart;
//     fs.readFile(filePath, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err) {
//         cart = JSON.parse(fileContent);
//       }
//       // Analyze the cart => Find existing product;
//       const existingProductIndex = cart.products.findIndex((product) => {
//         return product.id === id;
//       });
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;
//       // Add new product or increase the quantity;
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty = updatedProduct.qty + 1;
//         cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 };
//         cart.products = [...cart.products, updatedProduct];
//       }
//       cart.totalPrice = cart.totalPrice + +productPrice;
//       fs.writeFile(filePath, JSON.stringify(cart), (err) => {
//         console.log("[ERROR_TO_WRITE_FILE]", err);
//       });
//     });
//   }

//   static deleteProduct(id, productPrice) {
//     fs.readFile(filePath, (err, fileContent) => {
//       if (err) return;
//       const updatedCart = { ...JSON.parse(fileContent) };
//       const product = updatedCart.products.find((product) => product.id === id);
//       if (!product) return;
//       const productQty = product.qty;

//       updatedCart.products = updatedCart.products.filter((product) => product.id !== id);
//       updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
//       fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => {
//         console.log("[ERROR_TO_WRITE_FILE]", err);
//       });
//     });
//   }

//   static getCart(callBackFunction) {
//     fs.readFile(filePath, (err, fileContent) => {
//       const cart = JSON.parse(fileContent);
//       if (err) {
//         callBackFunction(null);
//       } else {
//         callBackFunction(cart);
//       }
//     });
//   }
// };
