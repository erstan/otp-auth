const {
  upsertOtp,
  validateOtp
} = require('../controllers/otp');

const express = require('express');
const router = express.Router();

router.route('/generate')
      .put(upsertOtp);

router.route('/validate')
      .get(validateOtp);

module.exports = router;
