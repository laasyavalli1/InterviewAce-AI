import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import api from "../services/api";

const Profile = () => {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const res = await api.get("/auth/profile");

                setProfile(res.data);

            }

            catch (err) {

                console.log(err);

            }

            finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);

    if (loading) return <Loading />;

    return (

        <div className="flex min-h-screen bg-slate-900">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-10">

                    <h1 className="text-4xl font-bold text-white">

                        👤 My Profile

                    </h1>

                    <p className="text-gray-400 mt-2">

                        View your InterviewAce account information.

                    </p>

                    {/* Profile Card */}

                    <div className="bg-slate-800 rounded-2xl shadow-xl mt-10 p-10">

                        <div className="flex items-center gap-6">

                            <div className="w-24 h-24 rounded-full bg-blue-600 flex justify-center items-center text-4xl font-bold text-white">

                                {profile.name.charAt(0).toUpperCase()}

                            </div>

                            <div>

                                <h2 className="text-3xl font-bold text-white">

                                    {profile.name}

                                </h2>

                                <p className="text-gray-400 text-lg">

                                    {profile.email}

                                </p>

                            </div>

                        </div>

                        {/* Statistics */}

                        <div className="grid md:grid-cols-3 gap-6 mt-12">

                            <div className="bg-slate-700 rounded-xl p-6">

                                <h3 className="text-gray-400">

                                    Interviews Taken

                                </h3>

                                <p className="text-4xl font-bold text-white mt-3">

                                    {profile.interviewsTaken}

                                </p>

                            </div>

                            <div className="bg-slate-700 rounded-xl p-6">

                                <h3 className="text-gray-400">

                                    Average Score

                                </h3>

                                <p className="text-4xl font-bold text-green-400 mt-3">

                                    {profile.averageScore}

                                </p>

                            </div>

                            <div className="bg-slate-700 rounded-xl p-6">

                                <h3 className="text-gray-400">

                                    Current Streak

                                </h3>

                                <p className="text-4xl font-bold text-orange-400 mt-3">

                                    🔥 {profile.currentStreak}

                                </p>

                            </div>

                        </div>

                        {/* Account Details */}

                        <div className="mt-12 border-t border-slate-600 pt-8">

                            <h3 className="text-2xl font-semibold text-white mb-6">

                                Account Details

                            </h3>

                            <div className="space-y-4 text-lg">

                                <div className="flex justify-between">

                                    <span className="text-gray-400">

                                        Name

                                    </span>

                                    <span className="text-white">

                                        {profile.name}

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-gray-400">

                                        Email

                                    </span>

                                    <span className="text-white">

                                        {profile.email}

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-gray-400">

                                        Member Since

                                    </span>

                                    <span className="text-white">

                                        {new Date(profile.createdAt).toLocaleDateString()}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Profile;