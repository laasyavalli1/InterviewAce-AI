import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

const AIEvaluation = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const messages = [
        "🤖 Analyzing your answers...",
        "📖 Comparing with ideal responses...",
        "📊 Calculating your interview score...",
        "✨ Generating personalized feedback..."
    ];

    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setMessageIndex((prev) =>
                prev < messages.length - 1 ? prev + 1 : prev
            );

        }, 2000);

        evaluateInterview();

        return () => clearInterval(interval);

    }, []);

    const evaluateInterview = async () => {

        try {

            await api.post(
                "/interview/submit",
                location.state
            );

            navigate("/results", {
                state: {
                    interviewId: location.state.interviewId
                }
            });

        } catch (err) {

            console.log(err);
            alert("Evaluation Failed");

        }

    };

    return (

        <div className="min-h-screen bg-slate-900 flex items-center justify-center">

            <div className="bg-slate-800 rounded-3xl shadow-2xl p-10 w-[650px] text-center">

                <div className="text-7xl animate-bounce">
                    🤖
                </div>

                <h1 className="text-4xl font-bold text-white mt-6">
                    InterviewAce AI
                </h1>

                <p className="text-blue-400 text-xl mt-6 font-semibold">
                    {messages[messageIndex]}
                </p>

                <div className="mt-8 flex justify-center">

                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                </div>

                <div className="w-full h-3 bg-slate-700 rounded-full mt-10 overflow-hidden">

                    <div className="bg-blue-500 h-full animate-pulse w-full"></div>

                </div>

                <p className="text-gray-400 mt-8">
                    Please wait while our AI evaluates your interview.
                </p>

                <p className="text-gray-500 mt-2">
                    This usually takes 5–15 seconds.
                </p>

            </div>

        </div>

    );

};

export default AIEvaluation;