require('dotenv').config({ path: './backend/config/config.env' })
const mongoose = require('mongoose')
const Admin = require('../model/admin_model')

async function run() {
  await mongoose.connect(process.env.DB_LOCAL_PORT)
  const email = process.env.ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.ADMIN_PASS || 'ChangeMe123!'
  const existing = await Admin.findOne({ email })
  if (existing) {
    console.log('admin exists:', email)
    process.exit(0)
  }
  const a = new Admin({ email, password })
  await a.save()
  console.log('admin created', email)
  process.exit(0)
}

run().catch(e => { console.error(e); process.exit(1) })
