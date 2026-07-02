const express = require('express');

const router = express.Router();

const protect = require('../middleware/authMiddleware');

const {
    getAnalytics, getLeaderboard
} = require('../controllers/analyticsController');

router.get(
    '/',
    protect,
    getAnalytics
);
router.get(
    "/leaderboard",
    protect,
    getLeaderboard
);
module.exports = router;