const Question = require('../models/Question');

exports.getQuestions = async (req, res) => {

    try {

        const filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.difficulty) {
            filter.difficulty = req.query.difficulty;
        }

        if (req.query.search) {
            filter.question = {
                $regex: req.query.search,
                $options: 'i'
            };
        }

        const questions = await Question.find(filter);

        res.json(questions);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

exports.getQuestionById = async (req, res) => {

    try {

        const question = await Question.findById(
            req.params.id
        );

        if (!question) {
            return res.status(404).json({
                message: 'Question not found'
            });
        }

        res.json(question);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};