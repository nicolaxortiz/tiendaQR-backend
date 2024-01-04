"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const moongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();

const port = 3900;

let url = process.env.MONGO_URL;

moongoose.Promise = global.Promise;

let product_routes = require("./routes/product");
let user_routes = require("./routes/user");
let cart_routes = require("./routes/cart");
let purchase_routes = require("./routes/purchase");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  next();
});

app.use("/api", product_routes);
app.use("/api", user_routes);
app.use("/api", cart_routes);
app.use("/api", purchase_routes);

moongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("Conexion a la base de datos completada");
  app.listen(port, () => {
    console.log("Ejecutando en el puerto " + port);
  });
});
