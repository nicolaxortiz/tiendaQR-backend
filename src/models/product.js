"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
  title: { type: String, required: true },
  detail: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: [String],
  size: [Number],
});

module.exports = mongoose.model("Product", ProductSchema);
