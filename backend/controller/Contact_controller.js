const sendtoken=require('../utils/restoken')
const catchasyncError=require('../middleware/catchasyncerror')
const User=require('../model/contact_model')
const nodemailer=require('nodemailer')


//Create new Blog Post
exports.Contact_us = catchasyncError(async (req, res, next) => {
    const { name, email, subject, feedback, message } = req.body;
    const user = await User.create({
        name,
        email,
        subject,
        feedback: feedback || message
    })

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    const mailOptions = {
        from: process.env.MAIL_FROM || process.env.MAIL_USER,
        to: process.env.MAIL_RECEIVER || process.env.MAIL_USER,
        replyTo: user.email,
        subject: user.subject,
        text: `Contact form submission from ${name} <${email}>:\n\n${user.feedback}`
    }

    let mailStatus = "Mail not sent"
    try {
        await transporter.sendMail(mailOptions)
        mailStatus = "Mail sent successfully"
    } catch (error) {
        console.error("Mail send error:", error.message || error)
        mailStatus = "Mail send failed"
    }

    sendtoken({
        message: `Contact saved. ${mailStatus}`,
        user
    }, 201, res)
})

exports.getContacts = catchasyncError(async (req, res, next) => {
    const contacts = await User.find().sort({ createdAt: -1 })
    sendtoken({
        message: 'Contacts retrieved successfully',
        contacts
    }, 200, res)
})

