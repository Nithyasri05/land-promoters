const express = require("express")
const { Contact_us, getContacts } = require("../controller/Contact_controller")
const router = express.Router()

router.route('/contact-us')
    .post(Contact_us)
    .get(getContacts)

module.exports = router