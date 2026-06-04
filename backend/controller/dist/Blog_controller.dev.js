"use strict";

// const ErrorHandler =require("../utils/ErrorHandeler")
var catchasyncError = require('../middleware/catchasyncerror');

var blog = require('../model/blog_model'); // const ApiFeatures =require("../utils/apifeatures")
//Create new Blog Post


exports.Contact_us = catchasyncError(function _callee(req, res, next) {
  var Blog;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(blog.create(req.body));

        case 2:
          Blog = _context.sent;
          res.status(201).json({
            success: true,
            message: "New Data created",
            Blog: Blog
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}); // //Get all the blog post
// exports.GetAllBlog=catchasyncError( async(req,res,next)=>{
//     const resperpage=1
//     const apifeatures= new ApiFeatures(blog.find(),req.query).search().filter().pageinate(resperpage)
//     const Blog=await apifeatures.quary
//     res.status(200).json({
//         sucess:true,
//         count:Blog.length,
//         Blog
//     })
// })
// //Get single blog post by id
// exports.GetsingleBlog= catchasyncError( async(req,res,next)=>{
//     const Blog= await blog.findById(req.params.id)
//     if(!Blog){
//         return next(new ErrorHandler('Blog has been not found', 404));
//     }
//     res.status(200).json({
//         success:true,
//         Blog
// })
// })
// //update the Product
// exports.UpdateBlogdata=catchasyncError( async (req,res,next)=>{
//     let Blog=await blog.findById(req.params.id)
//     if(!Blog){
//         return res.status(404).json({
//             success:false,
//             message:"Product Not Found"
//         })
//     }
//     Blog = await blog.findByIdAndUpdate(req.params.id,req.body,{
//         new: true,
//         runValidators: true
//     })
//     res.status(202).json({
//         sucess:true,
//         message:"Data updated",
//         Blog
// })
// })
// //Delete the Blog 
// exports.Deleteblog=catchasyncError( async(req,res,next)=>{
//     const Blog=await blog.findById(req.params.id);
//     if(!Blog){
//         return res.status(404).json({
//             sucess:false,
//             message:"Blog has deleted"
//         })
//     }
//     await Blog.deleteOne()
//     res.status(200).json({
//         sucess:true,
//         message:"Blog has delected"
//     }) 
// })