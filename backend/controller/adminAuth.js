const Admin = require('../model/admin_model')
const jwt = require('jsonwebtoken')
const catchAsync = require('../middleware/catchasyncerror')

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' })

  const admin = await Admin.findOne({ email })
  if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' })

  const ok = await admin.comparePassword(password)
  if (!ok) return res.status(401).json({ success: false, message: 'Invalid credentials' })

  const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.NET_TOKEN, { expiresIn: process.env.NET_EXPIRES_TIME || '7d' })
  res.status(200).json({ success: true, token })
})

exports.register = catchAsync(async (req, res, next) => {
  // Allow registration only when either request is by existing admin or env allows it
  const auth = req.headers.authorization
  const allowOpen = process.env.ADMIN_ALLOW_REGISTRATION === 'true'
  if (!allowOpen) {
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Unauthorized' })
    const token = auth.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.NET_TOKEN)
      if (decoded.role !== 'admin') return res.status(403).json({ success: false, message: 'Forbidden' })
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' })
    }
  }

  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' })
  const existing = await Admin.findOne({ email })
  if (existing) return res.status(400).json({ success: false, message: 'Admin already exists' })
  const a = new Admin({ email, password })
  await a.save()
  res.status(201).json({ success: true, message: 'Admin created' })
})

exports.changePassword = catchAsync(async (req, res, next) => {
  const admin = req.admin
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword) return res.status(400).json({ success: false, message: 'currentPassword and newPassword required' })
  const ok = await admin.comparePassword(currentPassword)
  if (!ok) return res.status(401).json({ success: false, message: 'Current password incorrect' })
  admin.password = newPassword
  await admin.save()
  res.status(200).json({ success: true, message: 'Password updated' })
})
