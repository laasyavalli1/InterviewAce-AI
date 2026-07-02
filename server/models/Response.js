const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema(
    {
        interviewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview',
            required: true
        },

        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        },

        answer: {
            type: String,
            required: true
        },

        score: {
            type: Number,
            default: 0
        },

        strengths: [
            {
                type: String
            }
        ],

        missingPoints: [
            {
                type: String
            }
        ],

        improvedAnswer: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    'Response',
    responseSchema
);