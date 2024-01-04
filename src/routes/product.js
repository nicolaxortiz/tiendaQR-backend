"use strict";

let express = require("express");

let Product = require("../controllers/product");

let router = express.Router();

router.post("/product/save", Product.save);
// router.get("/products", Product.getProducts);
router.get("/products", Product.getRangeProducts);
router.get("/product/:id", Product.getOneProduct);
router.delete("/product/delete/:id", Product.deleteProduct);

module.exports = router;
