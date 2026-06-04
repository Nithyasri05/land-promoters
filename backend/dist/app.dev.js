"use strict";

var express = require('express');

var contact = require("./router/Contact_router");

var cookie = require('cookie-parser');

var Errormiddleware = require("./middleware/error");

var cors = require('cors');

var app = express();
app.use(cors());
app.use(express.json());
app.use(cookie());
app.use(Errormiddleware);
app.use('/api/landpromoters', contact);
module.exports = app;