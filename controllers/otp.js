const Otp = require('../models/Otp');
const sendEmail = require('../helpers/sendEmail');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');

const upsertOtp = async (req, res, next) => {
  if(!req.body.email) {
    res.status(400).json({
      success: false,
      message: "Email is a required field"
    });
    return;
  }
  try {
    const otp = await Otp.findOneAndUpdate(
      {email: req.body.email},
      {
        email: req.body.email,
        otp: randomstring.generate({length: 6,charset: 'numeric'})
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
    sendEmail(
      process.env.SENDER_EMAIL,
      process.env.SENDER_PASSWORD,
      otp.email,
      `Your One-Time Password`,
      `Your OTP is ${otp.otp}`
    );
    res.status(200).json({
      success: true,
      message: "New OTP generated",
      data: {
        email: otp.email,
        otp: '<redacted>'
      }
    });
  } catch (err) {
    res.status(520).json({
      success: false,
      message: err.message
    });
  }
}

const validateOtp = async (req, res, next) => {
  try {
    const existingOtp = await Otp.findOne({
      email: req.query.email,
      otp: req.query.otp
    });
    if (!existingOtp) {
      res.status(401).json({
        success: false,
        message: "Unauthorized!"
      });
      return;
    } else {
      jwt.sign({email: existingOtp.email}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRY_DURATION}, (err, token) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: "Authorization successful",
            token: token,
            tokenType: "Bearer",
            expiresIn: process.env.JWT_EXPIRY_DURATION
          });
        } else {
          console.log(err.message);
        }
      });
    }
  } catch (err) {
    res.status(520).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  upsertOtp,
  validateOtp
}
