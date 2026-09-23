const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Property description is required'],
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    propertyType: {
      type: String,
      required: [true, 'Property type is required'],
      enum: {
        values: ['Residential Plot', 'Commercial Plot', 'Farm Land', 'Villa', 'Apartment'],
        message: 'Please select a valid property type',
      },
    },
    location: {
      address: { type: String, required: [true, 'Address is required'] },
      city: { type: String, required: [true, 'City is required'] },
      state: { type: String, default: 'Tamil Nadu' },
      pincode: { type: String },
      mapLink: { type: String },
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    area: {
      type: Number,
      required: [true, 'Area in sqft is required'],
      min: [0, 'Area cannot be negative'],
    },
    dimensions: {
      type: String,
      trim: true,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: {
        values: ['Available', 'Sold', 'Upcoming'],
        message: 'Please select a valid status',
      },
      default: 'Available',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Generate slug from title before saving
PropertySchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    // Append a short unique suffix to avoid collisions
    this.slug += '-' + Date.now().toString(36);
  }
  next();
});

// Virtual: formatted price in lakhs
PropertySchema.virtual('priceFormatted').get(function () {
  if (this.price >= 10000000) {
    return `₹${(this.price / 10000000).toFixed(2)} Cr`;
  }
  if (this.price >= 100000) {
    return `₹${(this.price / 100000).toFixed(2)} L`;
  }
  return `₹${this.price.toLocaleString('en-IN')}`;
});

// Index for search and filtering
PropertySchema.index({ title: 'text', description: 'text', 'location.city': 'text' });
PropertySchema.index({ propertyType: 1, status: 1, isFeatured: 1 });

module.exports = mongoose.model('Property', PropertySchema);
