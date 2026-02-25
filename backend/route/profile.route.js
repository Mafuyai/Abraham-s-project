const express = require('express');
const router = express.Router();
const {
    updateProfile,
    getProfile,
} = require('../controller/profile.controller');

router.post('/update', updateProfile);
router.get('/', getProfile);

module.exports = router;
