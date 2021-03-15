// work with file system
const fs = require("fs");
const path = require("path");
const filePath = path.join(path.dirname(require.main.filename), "data", "products.json");

module.exports = class Product {
  constructor(id, title, imageURL, price, description) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex((product) => {
          return product.id === this.id;
        });
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
          console.log("sss", err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          console.log("sss", err);
        });
      }
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
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      callBackFunction([]);
    } else {
      callBackFunction(JSON.parse(fileContent));
    }
  });
}
