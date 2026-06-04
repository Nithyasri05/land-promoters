"use strict";

var express = require("express");

var _require = require("../controller/Blog_controller"),
    Contact_us = _require.Contact_us;

var router = express.Router(); // const {isAuthenticateUser}=('../middleware/Authenticated')

router.route('/contact-as').post(Contact_us);
module.exports = router;