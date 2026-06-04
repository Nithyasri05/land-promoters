const jwt = require('jsonwebtoken')
const Admin = require('../model/admin_model')

exports.isAdmin = async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' })
  const token = auth.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.NET_TOKEN)
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
    req.admin = await Admin.findById(decoded.id).select('-password')
    if (!req.admin) return res.status(401).json({ message: 'Unauthorized' })
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
