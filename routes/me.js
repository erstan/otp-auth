const {
    getMe
} = require('../controllers/me');

const checkAuth = require('../middleware/checkAuth');

const express = require('express');
const router = express.Router();

router.route('/')
    .get(checkAuth, getMe);

module.exports = router;
