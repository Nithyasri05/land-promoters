const sendtoken = (data, statuscode, res) => {
    const options = {
        expires: new Date(Date.now() + process.env.COOKIES_EXPIERS_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.status(statuscode)
        .json({
            success: true,
            ...data
        })
}
module.exports = sendtoken