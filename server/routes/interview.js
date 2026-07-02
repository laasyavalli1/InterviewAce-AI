const express = require('express');
const router = express.Router();
const { startInterview, submitInterview, getInterviewHistory, getInterviewResponses } = require('../controllers/interviewController');

const protect = require('../middleware/authMiddleware');

router.post('/start', protect, startInterview);
router.post('/submit', protect, submitInterview);
router.get(
    '/history',
    protect,
    getInterviewHistory
);
router.get(
    '/responses/:id',
    protect,
    getInterviewResponses
);
module.exports = router;