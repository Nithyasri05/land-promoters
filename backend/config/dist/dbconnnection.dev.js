"use strict";

var mongodb = require('mongoose');

var datadaseconnection = function datadaseconnection() {
  mongodb.connect(process.env.DB_LOCAL_PORT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).then(console.log("server running in the port ".concat(process.env.DB_LOCAL_PORT)))["catch"](function (err) {
    return console.log("err");
  });
};

module.exports = datadaseconnection;