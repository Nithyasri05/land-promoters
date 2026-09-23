const Property = require('../model/property_model');
const catchAsyncError = require('../middleware/catchasyncerror');
const ErrorHandler = require('../utils/ErrorHandeler');

// @desc    Get all properties (public) — with search, filter, pagination
// @route   GET /api/landpromoters/properties
exports.getAllProperties = catchAsyncError(async (req, res, next) => {
  const {
    keyword,
    propertyType,
    status,
    minPrice,
    maxPrice,
    city,
    isFeatured,
    sort,
    page = 1,
    limit = 9,
  } = req.query;

  const query = {};

  // Text search
  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
      { 'location.city': { $regex: keyword, $options: 'i' } },
    ];
  }

  // Filters
  if (propertyType) query.propertyType = propertyType;
  if (status) query.status = status;
  if (city) query['location.city'] = { $regex: city, $options: 'i' };
  if (isFeatured === 'true') query.isFeatured = true;

  // Price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Sort
  let sortOption = { createdAt: -1 }; // default: newest first
  if (sort === 'price_asc') sortOption = { price: 1 };
  if (sort === 'price_desc') sortOption = { price: -1 };
  if (sort === 'oldest') sortOption = { createdAt: 1 };

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const total = await Property.countDocuments(query);
  const properties = await Property.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limitNum);

  res.status(200).json({
    success: true,
    count: properties.length,
    total,
    totalPages: Math.ceil(total / limitNum),
    currentPage: pageNum,
    properties,
  });
});

// @desc    Get featured properties (public)
// @route   GET /api/landpromoters/properties/featured
exports.getFeaturedProperties = catchAsyncError(async (req, res, next) => {
  const properties = await Property.find({ isFeatured: true, status: { $ne: 'Sold' } })
    .sort({ createdAt: -1 })
    .limit(6);

  res.status(200).json({
    success: true,
    count: properties.length,
    properties,
  });
});

// @desc    Get single property by slug (public)
// @route   GET /api/landpromoters/properties/:slug
exports.getPropertyBySlug = catchAsyncError(async (req, res, next) => {
  const property = await Property.findOne({ slug: req.params.slug });

  if (!property) {
    return next(new ErrorHandler('Property not found', 404));
  }

  res.status(200).json({
    success: true,
    property,
  });
});

// @desc    Create property (admin)
// @route   POST /api/landpromoters/admin/properties
exports.createProperty = catchAsyncError(async (req, res, next) => {
  // Handle uploaded images
  if (req.files && req.files.length > 0) {
    req.body.images = req.files.map((file) => `/uploads/${file.filename}`);
  }

  // Parse features and amenities if sent as comma-separated strings
  if (typeof req.body.features === 'string') {
    try {
      const parsedFeatures = JSON.parse(req.body.features);
      req.body.features = Array.isArray(parsedFeatures)
        ? parsedFeatures.map((feature) => String(feature).trim()).filter(Boolean)
        : [];
    } catch (e) {
      req.body.features = req.body.features.split(',').map((f) => f.trim()).filter(Boolean);
    }
  }
  if (typeof req.body.amenities === 'string') {
    try {
      const parsedAmenities = JSON.parse(req.body.amenities);
      req.body.amenities = Array.isArray(parsedAmenities)
        ? parsedAmenities.map((amenity) => String(amenity).trim()).filter(Boolean)
        : [];
    } catch (e) {
      req.body.amenities = req.body.amenities.split(',').map((a) => a.trim()).filter(Boolean);
    }
  }

  if (typeof req.body.area === 'string') req.body.area = Number(req.body.area.trim());
  if (typeof req.body.price === 'string') req.body.price = Number(req.body.price.trim());

  // Parse location if sent as JSON string
  if (typeof req.body.location === 'string') {
    try {
      req.body.location = JSON.parse(req.body.location);
    } catch (e) {
      return next(new ErrorHandler('Invalid location format', 400));
    }
  }

  const property = await Property.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Property created successfully',
    property,
  });
});

// @desc    Update property (admin)
// @route   PUT /api/landpromoters/admin/properties/:id
exports.updateProperty = catchAsyncError(async (req, res, next) => {
  let property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorHandler('Property not found', 404));
  }

  // Handle uploaded images (append to existing)
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((file) => `/uploads/${file.filename}`);
    req.body.images = [...(property.images || []), ...newImages];
  }

  // Parse features and amenities
  if (typeof req.body.features === 'string') {
    req.body.features = req.body.features.split(',').map((f) => f.trim()).filter(Boolean);
  }
  if (typeof req.body.amenities === 'string') {
    req.body.amenities = req.body.amenities.split(',').map((a) => a.trim()).filter(Boolean);
  }

  // Parse location
  if (typeof req.body.location === 'string') {
    try {
      req.body.location = JSON.parse(req.body.location);
    } catch (e) {
      return next(new ErrorHandler('Invalid location format', 400));
    }
  }

  property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Property updated successfully',
    property,
  });
});

// @desc    Delete property (admin)
// @route   DELETE /api/landpromoters/admin/properties/:id
exports.deleteProperty = catchAsyncError(async (req, res, next) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorHandler('Property not found', 404));
  }

  await Property.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Property deleted successfully',
  });
});

// @desc    Get property stats (admin)
// @route   GET /api/landpromoters/admin/properties/stats
exports.getPropertyStats = catchAsyncError(async (req, res, next) => {
  const totalProperties = await Property.countDocuments();
  const availableProperties = await Property.countDocuments({ status: 'Available' });
  const soldProperties = await Property.countDocuments({ status: 'Sold' });
  const upcomingProperties = await Property.countDocuments({ status: 'Upcoming' });
  const featuredProperties = await Property.countDocuments({ isFeatured: true });

  res.status(200).json({
    success: true,
    stats: {
      total: totalProperties,
      available: availableProperties,
      sold: soldProperties,
      upcoming: upcomingProperties,
      featured: featuredProperties,
    },
  });
});
