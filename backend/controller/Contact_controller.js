const sendtoken=require('../utils/restoken')
const catchasyncError=require('../middleware/catchasyncerror')
const User=require('../model/contact_model')


//Create new Blog Post
exports.Contact_us = catchasyncError(async (req, res, next) => {
    const { name, email, subject, feedback, message } = req.body;
    const user = await User.create({
        name,
        email,
        subject,
        feedback: feedback || message
    })

    sendtoken({
        message: 'Contact saved successfully.',
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

