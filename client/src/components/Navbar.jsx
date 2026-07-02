import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <nav className="h-20 bg-slate-800 border-b border-slate-700 flex justify-between items-center px-10">

            <div>

                <h1 className="text-3xl font-bold text-white">

                    InterviewAce AI

                </h1>

                <p className="text-gray-400 text-sm">

                    Practice • Improve • Get Hired

                </p>

            </div>

            <div className="flex items-center gap-6">

                <div className="text-right">

                    <p className="text-white font-semibold">

                        {user?.name || "Student"}

                    </p>

                    <p className="text-gray-400 text-sm">

                        {user?.email}

                    </p>

                </div>

                <button

                    onClick={logout}

                    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white transition"

                >

                    Logout

                </button>

            </div>

        </nav>

    );

};

export default Navbar;