const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true
        },

        topic: {
            type: String,
            required: true
        },

        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            required: true
        },

        question: {
            type: String,
            required: true
        },

        answerPoints: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Question', questionSchema);