const Testimonial = require('../model/testimonial_model');
const catchAsyncError = require('../middleware/catchasyncerror');
const ErrorHandler = require('../utils/ErrorHandeler');

// @desc    Get approved testimonials (public)
// @route   GET /api/landpromoters/testimonials
exports.getApprovedTestimonials = catchAsyncError(async (req, res, next) => {
  const testimonials = await Testimonial.find({ isApproved: true })
    .sort({ createdAt: -1 })
    .limit(20);

  res.status(200).json({
    success: true,
    count: testimonials.length,
    testimonials,
  });
});

// @desc    Submit a testimonial (public)
// @route   POST /api/landpromoters/testimonials
exports.submitTestimonial = catchAsyncError(async (req, res, next) => {
  const { name, role, message, rating } = req.body;

  if (!name || !message || !rating) {
    return next(new ErrorHandler('Name, message, and rating are required', 400));
  }

  const testimonial = await Testimonial.create({
    name,
    role: role || 'Customer',
    message,
    rating: Number(rating),
    isApproved: false, // Requires admin approval
  });

  res.status(201).json({
    success: true,
    message: 'Thank you for your feedback! Your testimonial will be reviewed shortly.',
    testimonial,
  });
});

exports.createAdminTestimonial = catchAsyncError(async (req, res, next) => {
  const { name, role, message, rating } = req.body;

  if (!name || !message || !rating) {
    return next(new ErrorHandler('Name, message, and rating are required', 400));
  }

  const testimonial = await Testimonial.create({
    name,
    role: role || 'Customer',
    message,
    rating: Number(rating),
    isApproved: true,
  });

  res.status(201).json({
    success: true,
    message: 'Testimonial published successfully',
    testimonial,
  });
});

// @desc    Get all testimonials (admin — includes unapproved)
// @route   GET /api/landpromoters/admin/testimonials
exports.getAllTestimonials = catchAsyncError(async (req, res, next) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: testimonials.length,
    testimonials,
  });
});

// @desc    Approve or reject a testimonial (admin)
// @route   PATCH /api/landpromoters/admin/testimonials/:id
exports.updateTestimonialStatus = catchAsyncError(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(new ErrorHandler('Testimonial not found', 404));
  }

  if (typeof req.body.isApproved !== 'undefined') {
    testimonial.isApproved = !!req.body.isApproved;
  }

  await testimonial.save();

  res.status(200).json({
    success: true,
    message: testimonial.isApproved ? 'Testimonial approved' : 'Testimonial rejected',
    testimonial,
  });
});

// @desc    Delete testimonial (admin)
// @route   DELETE /api/landpromoters/admin/testimonials/:id
exports.deleteTestimonial = catchAsyncError(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return next(new ErrorHandler('Testimonial not found', 404));
  }

  await Testimonial.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Testimonial deleted',
  });
});
