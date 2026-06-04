"use strict";

var _require = require('../controller/Auth_controller'),
    registerUser = _require.registerUser,
    loginUser = _require.loginUser;

var express = require("express");

var router = express();
router.route('/registeration').post(registerUser);
router.route('/login').post(loginUser);
module.exports = router;