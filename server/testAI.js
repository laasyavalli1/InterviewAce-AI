require("dotenv").config();

const {
    evaluateAnswer
} = require("./utils/aiService");

async function run() {

    try {

        const result = await evaluateAnswer(

            "What is an Array?",

            "Array stores same type elements.",

            [
                "Linear data structure",
                "Contiguous memory",
                "Same datatype"
            ]

        );

        console.log(result);

    }

    catch (err) {

        console.log(err);

    }

}

run();