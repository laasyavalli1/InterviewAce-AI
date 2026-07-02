import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const Register = () => {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const res = await api.post("/auth/register", {
                name,
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

        }

        catch (err) {

            setError(
                err.response?.data?.message || "Registration Failed"
            );

        }

        setLoading(false);

    };

    return (

        <div className="min-h-screen bg-slate-900 flex items-center justify-center">

            <div className="bg-slate-800 p-10 rounded-2xl shadow-xl w-[420px]">

                <h1 className="text-4xl font-bold text-center text-white">

                    Create Account

                </h1>

                <p className="text-center text-gray-400 mt-2 mb-8">

                    Start your Interview Journey

                </p>

                {

                    error &&

                    <p className="text-red-500 text-center mb-4">

                        {error}

                    </p>

                }

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input

                        type="text"

                        placeholder="Full Name"

                        value={name}

                        onChange={(e) => setName(e.target.value)}

                        className="w-full p-3 rounded-lg bg-slate-700 text-white"

                    />

                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e) => setEmail(e.target.value)}

                        className="w-full p-3 rounded-lg bg-slate-700 text-white"

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        className="w-full p-3 rounded-lg bg-slate-700 text-white"

                    />

                    <button

                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"

                    >

                        {

                            loading ?

                                "Creating Account..."

                                :

                                "Register"

                        }

                    </button>

                </form>

                <p className="text-center mt-6 text-gray-400">

                    Already have an account?

                    <Link

                        to="/login"

                        className="text-blue-400 ml-2"

                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Register;