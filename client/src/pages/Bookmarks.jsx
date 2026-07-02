import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import api from "../services/api";

const Bookmarks = () => {

    const [bookmarks, setBookmarks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchBookmarks();

    }, []);

    const fetchBookmarks = async () => {

        try {

            const res = await api.get("/bookmark");

            setBookmarks(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    const removeBookmark = async (questionId) => {

        try {

            await api.delete(`/bookmark/${questionId}`);

            setBookmarks(

                bookmarks.filter(

                    (bookmark) =>

                        bookmark.question._id !== questionId

                )

            );

        }

        catch (err) {

            console.log(err);

        }

    };

    if (loading) return <Loading />;

    return (

        <div className="flex min-h-screen bg-slate-900">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-10">

                    <h1 className="text-4xl font-bold text-white">

                        ⭐ My Bookmarks

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Quickly revisit your saved interview questions.

                    </p>

                    {

                        bookmarks.length === 0 ?

                            (

                                <div className="bg-slate-800 mt-10 rounded-2xl p-16 text-center">

                                    <h2 className="text-3xl text-white">

                                        No Bookmarks Yet

                                    </h2>

                                    <p className="text-gray-400 mt-4">

                                        Bookmark questions while practicing interviews.

                                    </p>

                                </div>

                            )

                            :

                            (

                                <div className="space-y-8 mt-10">

                                    {

                                        bookmarks.map((bookmark) => (

                                            <div

                                                key={bookmark._id}

                                                className="bg-slate-800 rounded-2xl p-8 shadow-lg"

                                            >

                                                <div className="flex justify-between items-start">

                                                    <div>

                                                        <div className="flex gap-3 mb-4">

                                                            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">

                                                                {bookmark.question.category}

                                                            </span>

                                                            <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">

                                                                {bookmark.question.topic}

                                                            </span>

                                                            <span className="bg-green-600 px-3 py-1 rounded-full text-sm">

                                                                {bookmark.question.difficulty}

                                                            </span>

                                                        </div>

                                                        <h2 className="text-2xl text-white font-semibold">

                                                            {bookmark.question.question}

                                                        </h2>

                                                    </div>

                                                    <button

                                                        onClick={() => {

                                                            const confirmDelete = window.confirm(
                                                                "Remove this bookmark?"
                                                            );

                                                            if (confirmDelete) {

                                                                removeBookmark(bookmark.question._id);

                                                            }

                                                        }}

                                                        className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg"
                                                    >

                                                        Remove Bookmark

                                                    </button>

                                                </div>

                                                <div className="mt-8">

                                                    <h3 className="text-xl font-semibold text-blue-400">

                                                        Expected Key Points

                                                    </h3>

                                                    <ul className="list-disc ml-8 mt-4 space-y-2 text-gray-300">

                                                        {

                                                            bookmark.question.answerPoints.map(

                                                                (point, index) => (

                                                                    <li key={index}>

                                                                        {point}

                                                                    </li>

                                                                )

                                                            )

                                                        }

                                                    </ul>

                                                </div>

                                            </div>

                                        ))

                                    }

                                </div>

                            )

                    }

                </div>

            </div>

        </div>

    );

};

export default Bookmarks;