"use strict";

let express = require("express");

let User = require("../controllers/user");

let router = express.Router();

router.post("/user/save", User.save);
router.post("/user/getbyEmail", User.getUserByEmail);

module.exports = router;
