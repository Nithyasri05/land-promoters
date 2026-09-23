const express = require('express');
const router = express.Router();
const {
  getAllProperties,
  getFeaturedProperties,
  getPropertyBySlug,
} = require('../controller/property_controller');

// Public routes
router.get('/', getAllProperties);
router.get('/featured', getFeaturedProperties);
router.get('/:slug', getPropertyBySlug);

module.exports = router;
