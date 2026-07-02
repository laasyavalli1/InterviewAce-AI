import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

import api from "../services/api";

const Dashboard = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({

        interviewsTaken: 0,

        averageScore: 0,

        bestSubject: "",

        weakestSubject: ""

    });

    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const res = await api.get("/analytics");

                setStats(res.data);

            }

            catch (err) {

                console.log(err);

            }

            finally {

                setLoading(false);

            }

        };

        fetchAnalytics();

    }, []);

    if (loading) return <Loading />;

    return (

        <div className="flex min-h-screen bg-slate-900">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-10">

                    {/* Welcome */}

                    <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl p-10 shadow-xl">

                        <h1 className="text-4xl font-bold text-white">

                            Welcome back, {user?.name} 👋

                        </h1>

                        <p className="text-blue-100 mt-3 text-lg">

                            Ready to practice and improve your interview skills today?

                        </p>

                    </div>

                    {/* Statistics */}

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-10">

                        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">

                            <p className="text-gray-400">

                                Interviews Taken

                            </p>

                            <h2 className="text-4xl font-bold text-white mt-3">

                                {stats.interviewsTaken}

                            </h2>

                        </div>

                        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">

                            <p className="text-gray-400">

                                Average Score

                            </p>

                            <h2 className="text-4xl font-bold text-green-400 mt-3">

                                {stats.averageScore}

                            </h2>

                        </div>

                        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">

                            <p className="text-gray-400">

                                Best Subject

                            </p>

                            <h2 className="text-3xl font-bold text-blue-400 mt-3">

                                🏆 {stats.bestSubject || "N/A"}

                            </h2>

                        </div>

                        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">

                            <p className="text-gray-400">

                                Weakest Subject

                            </p>

                            <h2 className="text-3xl font-bold text-red-400 mt-3">

                                📚 {stats.weakestSubject || "N/A"}

                            </h2>

                        </div>

                    </div>

                    {/* Quick Actions */}

                    <h2 className="text-3xl font-bold text-white mt-14 mb-6">

                        Quick Actions

                    </h2>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                        <button

                            onClick={() => navigate("/interview")}

                            className="bg-blue-600 hover:bg-blue-700 transition rounded-xl p-8"

                        >

                            <h3 className="text-2xl font-bold text-white">

                                🎤

                            </h3>

                            <p className="text-white mt-3 text-lg">

                                Start Interview

                            </p>

                        </button>

                        <button

                            onClick={() => navigate("/history")}

                            className="bg-green-600 hover:bg-green-700 transition rounded-xl p-8"

                        >

                            <h3 className="text-2xl font-bold text-white">

                                📜

                            </h3>

                            <p className="text-white mt-3 text-lg">

                                Interview History

                            </p>

                        </button>

                        <button

                            onClick={() => navigate("/bookmarks")}

                            className="bg-purple-600 hover:bg-purple-700 transition rounded-xl p-8"

                        >

                            <h3 className="text-2xl font-bold text-white">

                                ⭐

                            </h3>

                            <p className="text-white mt-3 text-lg">

                                Bookmarks

                            </p>

                        </button>

                        <button

                            onClick={() => navigate("/analytics")}

                            className="bg-orange-600 hover:bg-orange-700 transition rounded-xl p-8"

                        >

                            <h3 className="text-2xl font-bold text-white">

                                📊

                            </h3>

                            <p className="text-white mt-3 text-lg">

                                Analytics

                            </p>

                        </button>

                    </div>

                    {/* AI Tip */}

                    <div className="mt-12 bg-slate-800 rounded-2xl p-8">

                        <h2 className="text-2xl font-bold text-white">

                            💡 Interview Tip

                        </h2>

                        <p className="text-gray-300 mt-4 leading-8">

                            During technical interviews, don't just give the final answer.
                            Explain your thought process, discuss edge cases, and analyze
                            the time and space complexity. Interviewers evaluate your
                            approach as much as your solution.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Dashboard;