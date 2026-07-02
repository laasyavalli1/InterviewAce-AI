const express = require('express');

const router = express.Router();

const protect = require('../middleware/authMiddleware');

const {
    addBookmark,
    removeBookmark,
    getBookmarks
} = require('../controllers/bookmarkController');

router.post(
    '/:questionId',
    protect,
    addBookmark
);

router.delete(
    '/:questionId',
    protect,
    removeBookmark
);

router.get(
    '/',
    protect,
    getBookmarks
);

module.exports = router;