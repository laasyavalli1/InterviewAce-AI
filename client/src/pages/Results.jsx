import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";

const Results = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const interviewId = location.state?.interviewId;

    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!interviewId) {
            navigate("/dashboard");
            return;
        }

        fetchResults();

    }, []);

    const fetchResults = async () => {

        try {

            const res = await api.get(
                `/interview/responses/${interviewId}`
            );

            setResponses(res.data);

        }

        catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    if (loading)
        return <Loading />;

    const averageScore =
        responses.length > 0
            ? (
                responses.reduce(
                    (sum, r) => sum + r.score,
                    0
                ) / responses.length
            ).toFixed(1)
            : 0;

    return (

        <div className="min-h-screen bg-slate-900 text-white p-10">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-5xl font-bold text-center mb-4">

                    🎉 Interview Evaluation

                </h1>

                <div className="bg-slate-800 rounded-xl p-8 mb-10 shadow-xl">

                    <h2 className="text-3xl font-bold">

                        Overall Score

                    </h2>

                    <p className="text-6xl text-green-400 font-bold mt-4">

                        {averageScore} / 10

                    </p>

                </div>

                {

                    responses.map((item, index) => (

                        <div

                            key={item._id}

                            className="bg-slate-800 rounded-xl p-8 mb-8 shadow-lg"

                        >

                            <h2 className="text-2xl font-bold text-blue-400">

                                Question {index + 1}

                            </h2>

                            <p className="mt-4 text-lg">

                                {item.questionId.question}

                            </p>

                            <hr className="my-6 border-slate-600" />

                            <h3 className="text-green-400 font-semibold">

                                Your Answer

                            </h3>

                            <p className="mt-2">

                                {item.answer}
                            </p>

                            <div className="mt-6">

                                <span className="bg-green-600 px-4 py-2 rounded-lg">

                                    Score : {item.score}/10

                                </span>

                            </div>

                            <div className="mt-8">

                                <h3 className="text-green-400 font-bold">

                                    ✅ Strengths

                                </h3>

                                <ul className="list-disc ml-6 mt-3">

                                    {

                                        item.strengths.map((s, i) => (

                                            <li key={i}>{s}</li>

                                        ))

                                    }

                                </ul>

                            </div>

                            <div className="mt-8">

                                <h3 className="text-red-400 font-bold">

                                    ❌ Missing Points

                                </h3>

                                <ul className="list-disc ml-6 mt-3">

                                    {

                                        item.missingPoints.map((m, i) => (

                                            <li key={i}>{m}</li>

                                        ))

                                    }

                                </ul>

                            </div>

                            <div className="mt-8">

                                <h3 className="text-yellow-400 font-bold">

                                    💡 Improved Answer

                                </h3>

                                <div className="bg-slate-700 p-4 rounded-lg mt-3">

                                    {item.improvedAnswer}

                                </div>

                            </div>

                        </div>

                    ))

                }

                <div className="flex justify-center mt-10">

                    <button

                        onClick={() => navigate("/dashboard")}

                        className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg"

                    >

                        Back to Dashboard

                    </button>

                </div>

            </div>

        </div>

    );

};

export default Results;