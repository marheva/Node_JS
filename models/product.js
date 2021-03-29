const path = require("path");
const mongodb = require("mongodb");
const { getDb } = require("../util/database");

const filePath = path.join(path.dirname(require.main.filename), "data", "products.json");
const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageURL, price, description, userId) {
    this._id = id ? new mongodb.ObjectID(id) : null;
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      // UPDATE the product
      dbOperation = db.collection("products").updateOne(
        { _id: this._id },
        {
          $set: {
            _id: this._id,
            title: this.title,
            imageURL: this.imageURL,
            price: this.price,
            description: this.description,
          },
        }
      );
    } else {
      dbOperation = db.collection("products").insertOne(this);
    }

    return dbOperation
      .then((result) => console.log(result))
      .catch((error) => {
        console.log(error);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => products)
      .catch((error) => {
        console.log(error);
      });
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: mongodb.ObjectID(productId) })
      .next()
      .then((product) => product)
      .catch((error) => {
        console.log(error);
      });
  }

  static deleteById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: mongodb.ObjectID(productId) })
      .then((result) => console.log("[DELETED]"))
      .catch((error) => {
        console.log(error);
      });
  }
};
