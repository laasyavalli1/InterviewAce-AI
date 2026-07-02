import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import api from "../services/api";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const res = await api.post("/auth/login", {
                email,
                password
            });

            login(
                {
                    _id: res.data._id,
                    name: res.data.name,
                    email: res.data.email
                },
                res.data.token
            );

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message || "Login Failed"
            );

        }

        setLoading(false);

    };

    return (

        <div className="min-h-screen bg-slate-900 flex items-center justify-center">

            <div className="bg-slate-800 p-10 rounded-2xl shadow-xl w-[400px]">

                <h1 className="text-4xl font-bold text-center text-white">

                    InterviewAce AI

                </h1>

                <p className="text-center text-gray-400 mt-2 mb-8">

                    Practice. Improve. Get Hired.

                </p>

                {
                    error &&
                    <p className="text-red-500 mb-4 text-center">

                        {error}

                    </p>
                }

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input

                        type="email"

                        placeholder="Email"

                        className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none"

                        value={email}

                        onChange={(e) =>
                            setEmail(e.target.value)
                        }

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none"

                        value={password}

                        onChange={(e) =>
                            setPassword(e.target.value)
                        }

                    />

                    <button

                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"

                    >

                        {

                            loading ?

                                "Logging In..."

                                :

                                "Login"

                        }

                    </button>

                </form>
                <div className="my-6 flex justify-center">
                    <GoogleLogin
                        onSuccess={async (credentialResponse) => {

                            try {

                                const res = await api.post("/auth/google", {

                                    credential: credentialResponse.credential

                                });

                                login(

                                    {

                                        _id: res.data._id,

                                        name: res.data.name,

                                        email: res.data.email

                                    },

                                    res.data.token

                                );

                                navigate("/dashboard");

                            }

                            catch (err) {

                                console.log(err);

                                alert("Google Login Failed");

                            }

                        }}

                        onError={() => {

                            console.log("Google Login Failed");

                        }}
                    />

                </div>
                <p className="text-center text-gray-400 mt-6">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-400 ml-2"
                    >

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Login;