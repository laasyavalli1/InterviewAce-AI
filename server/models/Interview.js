const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        subject: {
            type: String,
            required: true
        },

        totalQuestions: {
            type: Number,
            required: true
        },

        score: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ['ongoing', 'completed'],
            default: 'ongoing'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Interview', interviewSchema);