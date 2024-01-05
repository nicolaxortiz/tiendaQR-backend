"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const fechaActual = new Date();

const fechaLocalColombiana = fechaActual.toLocaleString("es-CO");
console.log(fechaLocalColombiana);

let CartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: String,
    default: fechaLocalColombiana,
  },
  updatedAt: {
    type: String,
    default: fechaLocalColombiana,
  },
  products: [
    {
      type: {},
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
