"use strict";

let express = require("express");

let Purchase = require("../controllers/purchase");

let router = express.Router();

router.post("/purchase/save", Purchase.save);
router.post("/purchase/get", Purchase.getByUserId);

module.exports = router;
