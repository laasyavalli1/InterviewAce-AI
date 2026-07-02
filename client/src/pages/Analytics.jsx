import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import api from "../services/api";

const Analytics = () => {

    const [analytics, setAnalytics] = useState(null);

    const [leaderboard, setLeaderboard] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const analyticsRes =
                    await api.get("/analytics");

                const leaderboardRes =
                    await api.get("/analytics/leaderboard");

                setAnalytics(analyticsRes.data);

                setLeaderboard(leaderboardRes.data);

            }

            catch (err) {

                console.log(err);

            }

            finally {

                setLoading(false);

            }

        };

        fetchData();

    }, []);

    if (loading) return <Loading />;

    return (

        <div className="flex min-h-screen bg-slate-900">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-10">

                    <h1 className="text-4xl font-bold text-white">

                        📊 Analytics Dashboard

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Track your interview performance.

                    </p>

                    {/* Statistics */}

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

                        <div className="bg-slate-800 rounded-xl p-6">

                            <h2 className="text-gray-400">

                                Interviews Taken

                            </h2>

                            <p className="text-4xl font-bold text-white mt-3">

                                {analytics.interviewsTaken}

                            </p>

                        </div>

                        <div className="bg-slate-800 rounded-xl p-6">

                            <h2 className="text-gray-400">

                                Average Score

                            </h2>

                            <p className="text-4xl font-bold text-green-400 mt-3">

                                {analytics.averageScore}

                            </p>

                        </div>

                        <div className="bg-slate-800 rounded-xl p-6">

                            <h2 className="text-gray-400">

                                Best Subject

                            </h2>

                            <p className="text-3xl font-bold text-blue-400 mt-3">

                                {analytics.bestSubject}

                            </p>

                        </div>

                        <div className="bg-slate-800 rounded-xl p-6">

                            <h2 className="text-gray-400">

                                Weakest Subject

                            </h2>

                            <p className="text-3xl font-bold text-red-400 mt-3">

                                {analytics.weakestSubject}

                            </p>

                        </div>

                    </div>

                    {/* Leaderboard */}

                    <div className="bg-slate-800 rounded-xl p-8 mt-10">

                        <h2 className="text-3xl font-bold text-white mb-6">

                            🏆 Leaderboard

                        </h2>

                        <table className="w-full">

                            <thead>

                                <tr className="text-gray-400 border-b border-slate-700">

                                    <th className="text-left py-3">

                                        Rank

                                    </th>

                                    <th className="text-left py-3">

                                        Name

                                    </th>

                                    <th className="text-left py-3">

                                        Interviews

                                    </th>

                                    <th className="text-left py-3">

                                        Average Score

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    leaderboard.map((user, index) => (

                                        <tr
                                            key={user._id}
                                            className="border-b border-slate-700 hover:bg-slate-700 transition"
                                        >

                                            <td className="py-4">

                                                #{index + 1}

                                            </td>

                                            <td className="py-4">

                                                {user.name}

                                            </td>

                                            <td className="py-4">

                                                {user.interviewsTaken}

                                            </td>

                                            <td className="py-4 text-green-400 font-semibold">

                                                {user.averageScore}

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Analytics;