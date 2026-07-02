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
You are an expert technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Expected Key Points:
${answerPoints.join(", ")}

Evaluate the candidate's answer.

Return ONLY a raw JSON object.

Do NOT wrap the response inside \`\`\`json.
Do NOT write explanations.
Do NOT write any extra text.

Return exactly in this format:

{
    "score": 0,
    "strengths": [],
    "missingPoints": [],
    "improvedAnswer": ""
}
`;

    const completion = await client.chat.completions.create({

        model: "nvidia/nemotron-3-ultra-550b-a55b:free",

        messages: [
            {
                role: "user",
                content: prompt
            }
        ],

        temperature: 0.3

    });

    const response =
        completion.choices[0].message.content;

    // Remove markdown code fences if the model still returns them
    const cleanedResponse = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    console.log("\n===== AI RESPONSE =====\n");
    console.log(cleanedResponse);
    console.log("\n=======================\n");

    return JSON.parse(cleanedResponse);

};

module.exports = {
    evaluateAnswer
};