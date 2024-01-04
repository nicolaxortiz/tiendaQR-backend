"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const fechaActual = new Date();

const fechaLocalColombiana = fechaActual.toLocaleString("es-CO");

let PurchaseSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
    default: fechaLocalColombiana,
  },
  products: [
    {
      type: {},
    },
  ],
  delivered: {
    type: Boolean,
    default: false,
  },
  isCancel: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
