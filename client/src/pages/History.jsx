import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const History = () => {

    const navigate = useNavigate();

    const [interviews, setInterviews] = useState([]);

    const [loading, setLoading] = useState(true);

    //--------------------------------------------------

    useEffect(() => {

        fetchHistory();

    }, []);

    //--------------------------------------------------

    const fetchHistory = async () => {

        try {

            const res = await api.get("/interview/history");

            setInterviews(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    //--------------------------------------------------

    if (loading)

        return (

            <div className="min-h-screen bg-slate-900 flex justify-center items-center text-white text-3xl">

                Loading History...

            </div>

        );

    //--------------------------------------------------

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">

            <div className="max-w-6xl mx-auto py-10 px-6">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-5xl font-bold">

                            📜 Interview History

                        </h1>

                        <p className="text-gray-400 mt-3">

                            View all your previous mock interviews.

                        </p>

                    </div>

                    <button

                        onClick={() => navigate("/dashboard")}

                        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"

                    >

                        Dashboard

                    </button>

                </div>

                {

                    interviews.length === 0 ?

                        (

                            <div className="mt-20 text-center">

                                <h2 className="text-3xl">

                                    No Interviews Yet

                                </h2>

                                <p className="text-gray-400 mt-3">

                                    Start your first interview!

                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="grid md:grid-cols-2 gap-8 mt-12">

                                {

                                    interviews.map((item) => (

                                        <div

                                            key={item._id}

                                            className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl hover:scale-[1.02] transition"

                                        >

                                            <div className="flex justify-between items-center">

                                                <h2 className="text-3xl font-bold text-blue-400">

                                                    {item.subject}

                                                </h2>

                                                <span

                                                    className={`px-4 py-2 rounded-full text-sm

                                                    ${item.status === "completed"

                                                            ? "bg-green-600"

                                                            : "bg-yellow-500"

                                                        }

                                                `}

                                                >

                                                    {item.status}

                                                </span>

                                            </div>

                                            <div className="mt-6 space-y-3">

                                                <p>

                                                    📅 <span className="text-gray-300">

                                                        {

                                                            new Date(

                                                                item.createdAt

                                                            ).toLocaleDateString()

                                                        }

                                                    </span>

                                                </p>

                                                <p>

                                                    ❓ Questions :

                                                    <span className="font-semibold">

                                                        {" "}

                                                        {item.totalQuestions}

                                                    </span>

                                                </p>

                                                <p>

                                                    ⭐ Score :

                                                    <span className="font-semibold text-green-400">

                                                        {" "}

                                                        {item.score}/10

                                                    </span>

                                                </p>

                                            </div>

                                            <button

                                                onClick={() =>

                                                    navigate(

                                                        "/results",

                                                        {

                                                            state: {

                                                                interviewId: item._id

                                                            }

                                                        }

                                                    )

                                                }

                                                className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-semibold"

                                            >

                                                View Report →

                                            </button>

                                        </div>

                                    ))

                                }

                            </div>

                        )

                }

            </div>

        </div>

    );

};

export default History;