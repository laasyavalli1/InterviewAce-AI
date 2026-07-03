const Interview = require('../models/Interview');
const Response = require("../models/Response");
const {
    evaluateAnswer
} = require("../utils/aiService");
const Question = require('../models/Question');
exports.startInterview = async (req, res) => {

    try {

        const { subject } = req.body;

        const questions = await Question.find({
            category: subject
        }).limit(5);

        if (questions.length === 0) {
            return res.status(404).json({
                message: 'No questions found'
            });
        }

        const interview = await Interview.create({
            user: req.user._id,
            subject,
            totalQuestions: questions.length
        });

        res.status(201).json({
            interviewId: interview._id,
            questions
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
exports.submitInterview = async (req, res) => {
    console.log("submitInterview called");
    console.log(req.body);
    try {

        const { interviewId, answers } = req.body;

        let totalScore = 0;

        await Response.deleteMany({
            interviewId
        });
        for (const item of answers) {

            const question = await Question.findById(
                item.questionId
            );

            const aiResult = await evaluateAnswer(

                question.question,

                item.answer,

                question.answerPoints

            );

            totalScore += aiResult.score;

            await Response.create({

                interviewId,

                questionId: item.questionId,

                answer: item.answer,

                score: aiResult.score,

                strengths: aiResult.strengths,

                missingPoints: aiResult.missingPoints,

                improvedAnswer: aiResult.improvedAnswer

            });

        }

        const averageScore = Number(
            (totalScore / answers.length).toFixed(2)
        );

        const interview =
            await Interview.findByIdAndUpdate(

                interviewId,

                {

                    status: "completed",

                    score: averageScore

                },

                {

                    new: true

                }

            );

        res.json({

            message: "Interview submitted successfully",

            interview

        });

    }

    catch (error) {

        console.log("========= SUBMIT INTERVIEW ERROR =========");
        console.error(error);
        console.error(error.stack);
        console.log("=========================================");

        res.status(500).json({
            message: error.message
        });

    }

};


exports.getInterviewHistory = async (req, res) => {

    try {

        const interviews = await Interview.find({
            user: req.user._id
        }).sort({
            createdAt: -1
        });

        res.json(interviews);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
exports.getInterviewResponses = async (
    req,
    res
) => {

    try {

        const Response = require('../models/Response');

        const responses =
            await Response.find({
                interviewId: req.params.id
            })
                .populate(
                    'questionId',
                    'question topic difficulty'
                );

        res.json(responses);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};