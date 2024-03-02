const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is a required field']
  },
  otp: {
    type: String,
    required: [true, 'OTP is a required field']
  },
  createdDate: {
    type: Date,
    default: Date.now,
    index: {expires: process.env.OTP_TTL_DURATION}
    // TTL index to auto-remove the document after 1 minute of creation
  }
});

module.exports = mongoose.model('Otp', otpSchema);
