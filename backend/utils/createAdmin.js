const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../config/config.env') })
const mongoose = require('mongoose')
const Admin = require('../model/admin_model')

async function run() {
  if (!process.env.DB_LOCAL_PORT || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASS) {
    throw new Error('DB_LOCAL_PORT, ADMIN_EMAIL, and ADMIN_PASS must be configured')
  }

  await mongoose.connect(process.env.DB_LOCAL_PORT)
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASS
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
