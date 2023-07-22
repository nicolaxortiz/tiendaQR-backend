"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: {},
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
