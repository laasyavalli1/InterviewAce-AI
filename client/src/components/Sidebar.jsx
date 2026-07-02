import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {

    const location = useLocation();

    const menu = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "🏠"
        },

        {
            name: "Interview",
            path: "/interview",
            icon: "🎤"
        },

        {
            name: "History",
            path: "/history",
            icon: "📜"
        },

        {
            name: "Analytics",
            path: "/analytics",
            icon: "📊"
        },

        {
            name: "Bookmarks",
            path: "/bookmarks",
            icon: "⭐"
        },

        {
            name: "Profile",
            path: "/profile",
            icon: "👤"
        }

    ];

    return (

        <div className="w-72 min-h-screen bg-slate-800 border-r border-slate-700 flex flex-col">

            <div className="py-10 text-center border-b border-slate-700">

                <h1 className="text-white text-3xl font-bold">

                    InterviewAce

                </h1>

                <p className="text-gray-400 mt-2">

                    AI Interview Platform

                </p>

            </div>

            <div className="flex-1 mt-8 px-4">

                {

                    menu.map((item) => (

                        <Link

                            key={item.path}

                            to={item.path}

                            className={`

                            flex items-center gap-4

                            px-5 py-4

                            rounded-xl

                            mb-3

                            transition

                            ${location.pathname === item.path

                                    ? "bg-blue-600 text-white"

                                    : "text-gray-300 hover:bg-slate-700"}

                            `}

                        >

                            <span className="text-xl">

                                {item.icon}

                            </span>

                            <span className="font-medium">

                                {item.name}

                            </span>

                        </Link>

                    ))

                }

            </div>

            <div className="border-t border-slate-700 p-5 text-center">

                <p className="text-gray-500 text-sm">

                    InterviewAce AI

                </p>

                <p className="text-gray-600 text-xs">

                    Version 1.0

                </p>

            </div>

        </div>

    );

};

export default Sidebar;