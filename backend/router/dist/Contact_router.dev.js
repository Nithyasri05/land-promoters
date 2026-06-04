"use strict";

var express = require("express");

var _require = require("../controller/Contact_controller"),
    Contact_us = _require.Contact_us;

var router = express.Router();
router.route('/contact-us').post(Contact_us);
module.exports = router;