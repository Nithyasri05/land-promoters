"use strict";

var mongosh = require('mongoose');

var validator = require('validator');

var webtoken = require("jsonwebtoken");

var ContactSchema = new mongosh.Schema({
  name: {
    type: String,
    maxlength: [1000, "Enter the blog title with in 1000 words"]
  },
  email: {
    type: String,
    required: [true, "Enter your email"],
    validator: [validator.isEmail, "Enter the valid email "]
  },
  subject: {
    type: String,
    require: [true, "Enter your Blog Discription"],
    maxlength: [1000, "Enter the Blog Discription with in 1000 words"]
  },
  feedback: {
    type: String,
    trim: true,
    require: [true, "Enter your Blog Discription"]
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  }
});

ContactSchema.methods.jsonwebtoken = function () {
  return webtoken.sign({
    id: this.id
  }, process.env.NET_TOKEN, {
    expiresIn: process.env.NET_EXPIRES_TIME
  });
};

var schema = mongosh.model('contact', ContactSchema);
module.exports = schema; // image:[
//     {
//         image:{
//             type:String,
//             require:true
//         }
//     }
// ],