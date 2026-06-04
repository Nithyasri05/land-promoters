"use strict";

var ErrorHandler = require('../utils/ErrorHandeler');

var catchasyncerror = require('./catchasyncerror');

var Webtoken = require('jsonwebtoken');

var User = require("../model/userModel");

exports.isAuthenticateUser = catchasyncerror(function _callee(req, res, next) {
  var token, decode;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.cookies.token;

          if (token) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", next(new ErrorHandler("Login to Handel resourse", 400)));

        case 3:
          //decode
          decode = Webtoken.verify(token, process.env.NST_TOKEN);
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findById(decode.id));

        case 6:
          req.user = _context.sent;
          next();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});