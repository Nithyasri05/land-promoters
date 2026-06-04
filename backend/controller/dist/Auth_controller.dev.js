"use strict";

var catchasyncerror = require('../middleware/catchasyncerror');

var ErrorHandler = require("../utils/ErrorHandeler");

var User = require('../model/userModel');

var sendtoken = require('../utils/restoken');

exports.registerUser = catchasyncerror(function _callee(req, res, next) {
  var _req$body, name, email, password, avatar, role, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, avatar = _req$body.avatar, role = _req$body.role;

          if (!(!name || !email || !password || !avatar || !role)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", next(new ErrorHandler("please enter the Email & password Which is valide!", 400)));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            password: password,
            avatar: avatar,
            role: role
          }));

        case 5:
          user = _context.sent;
          // const token=user.jsonwebtoken()
          sendtoken(user, 201, res);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.loginUser = catchasyncerror(function _callee2(req, res, next) {
  var _req$body2, email, password, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", next(new ErrorHandler("Please Enter the Email & Password")));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).select('+password'));

        case 5:
          user = _context2.sent;

          if (user) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", next(new ErrorHandler("Invalid UserName Or Password", 401)));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(user.isValidPassword(password));

        case 10:
          if (_context2.sent) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", next(new ErrorHandler("Invalid userName Or Password", 401)));

        case 12:
          sendtoken(user, 201, res);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
});