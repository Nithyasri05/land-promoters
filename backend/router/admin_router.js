const express = require('express')
const { login, register, changePassword } = require('../controller/adminAuth')
const { isAdmin } = require('../middleware/auth')
const router = express.Router()

router.post('/login', login)

// Register new admin (requires existing admin token unless ADMIN_ALLOW_REGISTRATION=true)
router.post('/register', register)

// Change password (authenticated admin)
router.post('/change-password', isAdmin, changePassword)

// Protected: list messages
router.get('/messages', isAdmin, async (req, res) => {
  const Contact = require('../model/contact_model')
  const msgs = await Contact.find().sort({ createdAt: -1 })
  res.status(200).json({ success: true, msgs })
})

router.get('/messages/:id', isAdmin, async (req, res) => {
  const Contact = require('../model/contact_model')
  const msg = await Contact.findById(req.params.id)
  if (!msg) return res.status(404).json({ success: false, message: 'Not found' })
  res.status(200).json({ success: true, msg })
})

// mark read/unread or update
router.patch('/messages/:id', isAdmin, async (req, res) => {
  const Contact = require('../model/contact_model')
  const update = {}
  if (typeof req.body.read !== 'undefined') update.read = !!req.body.read
  const m = await Contact.findByIdAndUpdate(req.params.id, update, { new: true })
  if (!m) return res.status(404).json({ success: false, message: 'Not found' })
  res.status(200).json({ success: true, msg: m })
})

router.delete('/messages/:id', isAdmin, async (req, res) => {
  const Contact = require('../model/contact_model')
  const m = await Contact.findByIdAndDelete(req.params.id)
  if (!m) return res.status(404).json({ success: false, message: 'Not found' })
  res.status(200).json({ success: true, message: 'Deleted' })
})

// Reply to a message via email
router.post('/messages/:id/reply', isAdmin, async (req, res) => {
  const Contact = require('../model/contact_model')
  const nodemailer = require('nodemailer')
  const msg = await Contact.findById(req.params.id)
  if (!msg) return res.status(404).json({ success: false, message: 'Not found' })
  const { replySubject, replyBody } = req.body
  if (!replyBody) return res.status(400).json({ success: false, message: 'replyBody required' })

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
  })

  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to: msg.email,
    subject: replySubject || `Re: ${msg.subject}`,
    text: replyBody
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ success: true, message: 'Reply sent' })
  } catch (err) {
    console.error('Reply mail error', err)
    res.status(500).json({ success: false, message: 'Failed to send reply' })
  }
})

module.exports = router
