"use strict";

var ErrorHandler = require('../utils/ErrorHandeler');

module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV == "Developement_enviroment") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err
    });
  }

  if (process.env.NODE_ENV == "Production_enviroment") {
    var message = err.message;
    var error = new ErrorHandler(message); //validation error

    if (err.name == "validationError") {
      message = Object.values(err.errors).map(function (values) {
        return values.message;
      });
      error = new ErrorHandler(message);
    } //cast Error


    if (err.name = "castError") {
      message = " Resource is not Found ".concat(err.path), error = new ErrorHandler(message);
    } //


    res.status(err.statusCode).json({
      success: false,
      message: error.message || "internal Server Error"
    });
  }
};