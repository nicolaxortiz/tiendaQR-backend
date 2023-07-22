"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  document: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cellphone: { type: Number, required: true, unique: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
