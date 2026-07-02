const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { googleLogin } = require("../controllers/authController");
router.post('/register', register);
router.post('/login', login);

const protect = require('../middleware/authMiddleware');

router.get(
    '/profile',
    protect,
    getProfile
);
router.post(
    "/google",
    googleLogin
);
module.exports = router;