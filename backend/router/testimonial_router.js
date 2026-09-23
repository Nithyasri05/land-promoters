const express = require('express');
const router = express.Router();
const {
  getApprovedTestimonials,
  submitTestimonial,
} = require('../controller/testimonial_controller');

// Public routes
router.get('/', getApprovedTestimonials);
router.post('/', submitTestimonial);

module.exports = router;
