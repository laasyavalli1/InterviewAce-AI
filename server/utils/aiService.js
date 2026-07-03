const OpenAI = require("openai");

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

const evaluateAnswer = async (
    question,
    answer,
    answerPoints
) => {

    const prompt = `
You are an experienced technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Expected Key Points:
${answerPoints.join(", ")}

Evaluate the answer using ONLY these rules:

SCORING:
- Score must be an INTEGER from 0 to 10.
- Never return a score above 10.
- Never return decimals.

Rubric:
10 = Covers all key points accurately.
8-9 = Covers most key points with minor omissions.
6-7 = Covers about half the key points.
3-5 = Covers only a few important points.
1-2 = Mostly incorrect.
0 = Completely wrong or empty answer.

Return ONLY valid JSON.

{
    "score": 0,
    "strengths": [],
    "missingPoints": [],
    "improvedAnswer": ""
}

Do not return markdown.
Do not return explanations.
Do not return code fences.
`;

    const completion = await client.chat.completions.create({

        model: "nvidia/nemotron-3-ultra-550b-a55b:free",

        messages: [
            {
                role: "user",
                content: prompt
            }
        ],

        temperature: 0.2

    });

    const response =
        completion.choices[0].message.content;

    console.log("\n===== RAW AI RESPONSE =====");
    console.log(response);

    const cleanedResponse = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    try {

        const parsed = JSON.parse(cleanedResponse);

        parsed.score = Number(parsed.score);

        if (isNaN(parsed.score))
            parsed.score = 0;

        parsed.score = Math.max(
            0,
            Math.min(10, Math.round(parsed.score))
        );

        parsed.strengths =
            Array.isArray(parsed.strengths)
                ? parsed.strengths.slice(0, 3)
                : [];

        parsed.missingPoints =
            Array.isArray(parsed.missingPoints)
                ? parsed.missingPoints.slice(0, 3)
                : [];

        parsed.improvedAnswer =
            parsed.improvedAnswer || "";

        return parsed;

    }

    catch (err) {

        console.log("Invalid AI JSON");

        return {

            score: 0,

            strengths: [],

            missingPoints: answerPoints,

            improvedAnswer: "Unable to evaluate answer."

        };

    }

};

module.exports = {
    evaluateAnswer
};
