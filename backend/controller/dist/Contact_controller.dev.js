"use strict";

var sendtoken = require('../utils/restoken');

var catchasyncError = require('../middleware/catchasyncerror');

var User = require('../model/contact_model');

var nodemailer = require('nodemailer'); //Create new Blog Post


exports.Contact_us = catchasyncError(function _callee(req, res, next) {
  var _req$body, name, email, subject, feedback, user, transporters, message;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, subject = _req$body.subject, feedback = _req$body.feedback;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            subject: subject,
            feedback: feedback
          }));

        case 3:
          user = _context.sent;
          transporters = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            }
          });
          message = {
            from: user.email,
            to: process.env.MAIL_RECEIVER || process.env.MAIL_USER,
            subject: user.subject,
            text: user.feedback
          };
          transporters.sendMail(message, function (err, info) {
            if (err) {
              res.status(404).json({
                message: "somethink went wrong! try again"
              });
              res.status(200).json({
                message: "message send to the mail id ".concat(user.email)
              });
            }
          });
          sendtoken(message, 201, res);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});