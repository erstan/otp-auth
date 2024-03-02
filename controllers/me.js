const getMe = async (req, res, next) => {
    // send email of the valid JWT owner
    res.status(200).json({email: req.me});
}
module.exports = {getMe};