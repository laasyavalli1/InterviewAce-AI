const Interview = require('../models/Interview');

exports.getAnalytics = async (req, res) => {

    try {

        const interviews = await Interview.find({
            user: req.user._id,
            status: 'completed'
        });

        const interviewsTaken = interviews.length;

        let averageScore = 0;
        let bestSubject = 'N/A';
        let weakestSubject = 'N/A';

        if (interviewsTaken > 0) {

            const totalScore = interviews.reduce(
                (sum, interview) => sum + interview.score,
                0
            );

            averageScore =
                totalScore / interviewsTaken;

            const subjectStats = {};

            interviews.forEach((interview) => {

                if (!subjectStats[interview.subject]) {

                    subjectStats[interview.subject] = {
                        total: 0,
                        count: 0
                    };

                }

                subjectStats[interview.subject].total += interview.score;
                subjectStats[interview.subject].count += 1;

            });

            let highestAvg = -1;
            let lowestAvg = Infinity;

            for (const subject in subjectStats) {

                const avg =
                    subjectStats[subject].total /
                    subjectStats[subject].count;

                if (avg > highestAvg) {

                    highestAvg = avg;
                    bestSubject = subject;

                }

                if (avg < lowestAvg) {

                    lowestAvg = avg;
                    weakestSubject = subject;

                }

            }

        }

        res.json({

            interviewsTaken,

            averageScore: Number(
                averageScore.toFixed(2)
            ),

            bestSubject,

            weakestSubject

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
exports.getLeaderboard = async (req, res) => {

    try {

        const User = require('../models/User');

        const leaderboard = await User.find()
            .select(
                'name averageScore interviewsTaken'
            )
            .sort({
                averageScore: -1
            });

        res.json(leaderboard);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};