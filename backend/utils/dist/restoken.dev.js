"use strict";

var sendtoken = function sendtoken(user, statuscode, res) {
  // const token=user.jsonwebtoken();
  //seting cookies
  var options = {
    expires: new Date(Date.now() + process.env.COOKIES_EXPIERS_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  res.status(statuscode) // .cookie("token",token,options)
  .json({
    success: true,
    user: user
  });
};

module.exports = sendtoken;