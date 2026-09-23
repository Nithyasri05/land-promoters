const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Route imports
const contactRouter = require('./router/Contact_router');
const adminRouter = require('./router/admin_router');
const propertyRouter = require('./router/property_router');
const testimonialRouter = require('./router/testimonial_router');

// Middleware imports
const errorMiddleware = require('./middleware/error');

const app = express();

// --------------- Security Middleware ---------------
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow images to be served
}));
app.use(cors());

// Rate limiting — 100 requests per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// --------------- Body Parsers ---------------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --------------- Static Files ---------------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --------------- API Routes ---------------
// Public routes
app.use('/api/landpromoters', contactRouter);
app.use('/api/landpromoters/properties', propertyRouter);
app.use('/api/landpromoters/testimonials', testimonialRouter);

// Admin routes
app.use('/api/landpromoters/admin', adminRouter);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Land Promoters API is running',
    version: '2.0.0',
  });
});

// --------------- Error Handling ---------------
app.use(errorMiddleware);

module.exports = app;