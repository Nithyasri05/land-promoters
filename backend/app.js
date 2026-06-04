const express = require('express')
const contact = require('./router/Contact_router')
const adminRouter = require('./router/admin_router')
const cookie = require('cookie-parser')
const Errormiddleware = require('./middleware/error')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookie())

app.use('/api/landpromoters', contact)
app.use('/api/landpromoters/admin', adminRouter)

app.get('/', (req, res) => {
  res.send('Backend is running')
})

app.use(Errormiddleware)

module.exports = app;