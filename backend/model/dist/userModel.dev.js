"use strict";

var mongoosh = require("mongoose");

var bcrypt = require("bcrypt");

var validator = require("validator");

var Webtoken = require('jsonwebtoken');

var UserSchema = new mongoosh.Schema({
  name: {
    type: String,
    require: [true, "Enter the User Name"]
  },
  email: {
    type: String,
    required: [true, "Enter your email"],
    unique: true,
    validator: [validator.isEmail, "Enter the valid email "]
  },
  password: {
    type: String,
    required: true,
    select: false,
    maxlength: [16, "Password can't exced 16 characters"]
  },
  avatar: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "default": "user"
  },
  resetpassWordToken: String,
  resetpassWordTokenExpire: Date,
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
UserSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 15));

        case 2:
          this.password = _context.sent;

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

UserSchema.methods.jsonwebtoken = function () {
  return Webtoken.sign({
    id: this.id
  }, process.env.NST_TOKEN, {
    expiresIn: process.env.NST_EXPIRES_TIME
  });
};

UserSchema.methods.isValidPassword = function _callee2(entedpassword) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.compare(entedpassword, this.password));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

var model = mongoosh.model('user', UserSchema);
module.exports = model;