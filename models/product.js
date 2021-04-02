const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MODEL_NAME = "Product";
const REF_MODULE_NAME = "User";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: REF_MODULE_NAME,
    required: true,
  },
});

module.exports = mongoose.model(MODEL_NAME, productSchema);
