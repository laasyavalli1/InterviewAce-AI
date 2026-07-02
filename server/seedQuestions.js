
const dotenv = require('dotenv');

const Question = require('./models/Question');
const questions = require('./data/questions');

dotenv.config();
const mongoose = require('mongoose');
const dns = require('dns');

// Force clean DNS resolution servers to prevent connection drops
dns.setServers(["1.1.1.1", "8.8.8.8"]);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const importData = async () => {
    try {

        await Question.deleteMany();

        await Question.insertMany(questions);

        console.log('Questions Seeded Successfully');

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);

    }
};

importData();