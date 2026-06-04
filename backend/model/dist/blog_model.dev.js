"use strict";

var mongosh = require('mongoose');

var Blog_model = new mongosh.Schema({
  title: {
    type: String,
    require: [true, "Enter the blog title"],
    trim: true,
    maxlength: [3000, "Enter the blog title with in 3000 words"]
  },
  discription: {
    type: String,
    require: [true, "Enter your Blog Discription"],
    maxlength: [1000, "Enter the Blog Discription with in 1000 words"]
  },
  category: {
    type: String,
    require: [true, "Enter the blog catagory"],
    "enum": {
      values: ['Technology', 'Artificial intelligence', 'Finance', 'Global Finance', 'Others'],
      message: "Select the blog category"
    }
  },
  author: {
    type: String,
    require: [true, "Enter the Author Name"]
  },
  reviews: [{
    user: {
      type: String,
      ref: 'User'
    },
    rating: {
      type: String,
      require: true
    },
    comment: {
      type: String,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    "default": Date.now()
  },
  rating: {
    type: String,
    "default": 0
  }
});
var schema = mongosh.model('Blog', Blog_model);
module.exports = schema; // image:[
//     {
//         image:{
//             type:String,
//             require:true
//         }
//     }
// ],