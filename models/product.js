// work with file system
const fs = require("fs");
const path = require("path");
const filePath = path.join(path.dirname(require.main.filename), "data", "products.json");

module.exports = class Product {
  constructor(title, imageURL, price, description) {
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log("sss", err);
      });
    });
  }

  static fetchAll(callBackFunction) {
    getProductsFromFile(callBackFunction);
  }

  static findById(id, callBackFunction) {
    getProductsFromFile((products) => {
      const product = products.find((product) => {
        return product.id === id;
      });
      callBackFunction(product);
    });
  }
};

function getProductsFromFile(callBackFunction) {
  this.id = Math.random().toString();
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      callBackFunction([]);
    } else {
      callBackFunction(JSON.parse(fileContent));
    }
  });
}
