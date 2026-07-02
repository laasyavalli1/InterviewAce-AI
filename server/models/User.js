const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            default: null
        },

        provider: {
            type: String,
            enum: ["local", "google"],
            default: "local"
        },

        interviewsTaken: {
            type: Number,
            default: 0
        },

        averageScore: {
            type: Number,
            default: 0
        },

        currentStreak: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);