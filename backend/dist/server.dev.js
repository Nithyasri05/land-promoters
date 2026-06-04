"use strict";

var server = require('./app');

var dotevn = require('dotenv');

var path = require('path');

var datadaseconnection = require('./config/dbconnnection');

dotevn.config({
  path: path.join(__dirname, 'config/config.env')
});
datadaseconnection();
server.listen(process.env.PORT, function () {
  console.log("server running in the port ".concat(process.env.PORT, " in ").concat(process.env.NODE_ENV));
});