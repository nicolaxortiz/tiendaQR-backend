"use strict";

let express = require("express");

let Cart = require("../controllers/cart");

let router = express.Router();

router.post("/cart/save", Cart.save);
router.post("/cart/getCart", Cart.getCartbyUserId);
router.patch("/cart/updateCart", Cart.updateCart);

module.exports = router;
