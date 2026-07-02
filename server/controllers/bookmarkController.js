const Bookmark = require('../models/Bookmark');

exports.addBookmark = async (req, res) => {

    try {

        const existingBookmark =
            await Bookmark.findOne({
                user: req.user._id,
                question: req.params.questionId
            });

        if (existingBookmark) {

            return res.status(400).json({
                message: 'Question already bookmarked'
            });

        }

        const bookmark =
            await Bookmark.create({
                user: req.user._id,
                question: req.params.questionId
            });

        res.status(201).json(bookmark);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.removeBookmark = async (req, res) => {

    try {

        const bookmark =
            await Bookmark.findOneAndDelete({
                user: req.user._id,
                question: req.params.questionId
            });

        if (!bookmark) {

            return res.status(404).json({
                message: 'Bookmark not found'
            });

        }

        res.json({
            message: 'Bookmark removed successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getBookmarks = async (req, res) => {

    try {

        const bookmarks =
            await Bookmark.find({
                user: req.user._id
            }).populate('question');

        res.json(bookmarks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};