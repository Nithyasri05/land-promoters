const express = require('express');
const { login, register, changePassword } = require('../controller/adminAuth');
const { isAdmin } = require('../middleware/auth');
const {
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyStats,
} = require('../controller/property_controller');
const {
  getAllTestimonials,
  createAdminTestimonial,
  updateTestimonialStatus,
  deleteTestimonial,
} = require('../controller/testimonial_controller');
const upload = require('../middleware/upload');
const Contact = require('../model/contact_model');
const nodemailer = require('nodemailer');

const router = express.Router();

// ==================== Auth Routes ====================
router.post('/login', login);
router.post('/register', register);
router.post('/change-password', isAdmin, changePassword);

// ==================== Dashboard Stats ====================
router.get('/stats', isAdmin, async (req, res) => {
  const Property = require('../model/property_model');
  const Testimonial = require('../model/testimonial_model');

  const [totalProperties, totalMessages, unreadMessages, totalTestimonials] =
    await Promise.all([
      Property.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false }),
      Testimonial.countDocuments(),
    ]);

  const statusCounts = await Property.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const stats = {
    totalProperties,
    totalMessages,
    unreadMessages,
    totalTestimonials,
    propertiesByStatus: {},
  };

  statusCounts.forEach((s) => {
    stats.propertiesByStatus[s._id] = s.count;
  });

  res.status(200).json({ success: true, stats });
});

// ==================== Message Routes ====================
router.get('/messages', isAdmin, async (req, res) => {
  const msgs = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, msgs });
});

router.get('/messages/:id', isAdmin, async (req, res) => {
  const msg = await Contact.findById(req.params.id);
  if (!msg) return res.status(404).json({ success: false, message: 'Not found' });
  res.status(200).json({ success: true, msg });
});

router.patch('/messages/:id', isAdmin, async (req, res) => {
  const update = {};
  if (typeof req.body.read !== 'undefined') update.read = !!req.body.read;
  const m = await Contact.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!m) return res.status(404).json({ success: false, message: 'Not found' });
  res.status(200).json({ success: true, msg: m });
});

router.delete('/messages/:id', isAdmin, async (req, res) => {
  const m = await Contact.findByIdAndDelete(req.params.id);
  if (!m) return res.status(404).json({ success: false, message: 'Not found' });
  res.status(200).json({ success: true, message: 'Deleted' });
});

router.post('/messages/:id/reply', isAdmin, async (req, res) => {
  const msg = await Contact.findById(req.params.id);
  if (!msg) return res.status(404).json({ success: false, message: 'Not found' });
  const { replySubject, replyBody } = req.body;
  if (!replyBody)
    return res.status(400).json({ success: false, message: 'replyBody required' });

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.MAIL_PORT || 465),
    secure: String(process.env.MAIL_SECURE || 'true') === 'true',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to: msg.email,
    subject: replySubject || `Re: ${msg.subject}`,
    text: replyBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Reply sent' });
  } catch (err) {
    console.error('Reply mail error:', err.code || 'UNKNOWN', err.message);
    res.status(502).json({
      success: false,
      message: 'Email could not be sent. Check the backend SMTP credentials and restart the server.',
    });
  }
});

// ==================== Property Admin Routes ====================
router.get('/properties/stats', isAdmin, getPropertyStats);
router.post('/properties', isAdmin, upload.array('images', 10), createProperty);
router.put('/properties/:id', isAdmin, upload.array('images', 10), updateProperty);
router.delete('/properties/:id', isAdmin, deleteProperty);

// ==================== Testimonial Admin Routes ====================
router.get('/testimonials', isAdmin, getAllTestimonials);
router.post('/testimonials', isAdmin, createAdminTestimonial);
router.patch('/testimonials/:id', isAdmin, updateTestimonialStatus);
router.delete('/testimonials/:id', isAdmin, deleteTestimonial);

module.exports = router;
