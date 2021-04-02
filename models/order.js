const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MODEL_NAME = "Order";
const REF_MODULE_NAME = "User";

const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: REF_MODULE_NAME,
    },
  },
});

module.exports = mongoose.model(MODEL_NAME, orderSchema);
