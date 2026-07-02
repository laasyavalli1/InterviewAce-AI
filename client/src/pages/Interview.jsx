// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// const Interview = () => {

//     const navigate = useNavigate();

//     const [subject, setSubject] = useState("DSA");

//     const [questions, setQuestions] = useState([]);

//     const [currentQuestion, setCurrentQuestion] = useState(0);

//     const [answers, setAnswers] = useState({});

//     const [started, setStarted] = useState(false);

//     const [interviewId, setInterviewId] = useState("");

//     const [loading, setLoading] = useState(false);

//     const [submitting, setSubmitting] = useState(false);

//     const [timeLeft, setTimeLeft] = useState(300);

//     //--------------------------------------------------------

//     const formatTime = (seconds) => {

//         const mins = Math.floor(seconds / 60);

//         const secs = seconds % 60;

//         return `${mins}:${secs.toString().padStart(2, "0")}`;

//     };

//     //--------------------------------------------------------

//     useEffect(() => {

//         if (!started) return;

//         if (timeLeft <= 0) {

//             submitInterview();

//             return;

//         }

//         const timer = setTimeout(() => {

//             setTimeLeft(prev => prev - 1);

//         }, 1000);

//         return () => clearTimeout(timer);

//     }, [timeLeft, started]);

//     //--------------------------------------------------------

//     const startInterview = async () => {

//         try {

//             setLoading(true);

//             const res = await api.post("/interview/start", {

//                 subject

//             });

//             setInterviewId(res.data.interviewId);

//             setQuestions(res.data.questions);

//             setStarted(true);

//         }

//         catch (err) {

//             console.log(err);

//             alert("Unable to start interview.");

//         }

//         finally {

//             setLoading(false);

//         }

//     };

//     //--------------------------------------------------------

//     const handleAnswer = (value) => {

//         setAnswers({

//             ...answers,

//             [questions[currentQuestion]._id]: value

//         });

//     };

//     //--------------------------------------------------------

//     const nextQuestion = () => {

//         if (currentQuestion < questions.length - 1)

//             setCurrentQuestion(prev => prev + 1);

//     };

//     //--------------------------------------------------------

//     const previousQuestion = () => {

//         if (currentQuestion > 0)

//             setCurrentQuestion(prev => prev - 1);

//     };

//     //--------------------------------------------------------

//     const submitInterview = async () => {

//         if (submitting) return;

//         setSubmitting(true);

//         const formattedAnswers = questions.map(q => ({

//             questionId: q._id,

//             answer: answers[q._id] || ""

//         }));

//         try {

//             await api.post("/interview/submit", {

//                 interviewId,

//                 answers: formattedAnswers

//             });

//             navigate("/results", {

//                 state: {

//                     interviewId

//                 }

//             });

//         }

//         catch (err) {

//             console.log(err);

//             alert("Submission Failed");

//         }

//     };

//     //--------------------------------------------------------

//     const progress = questions.length

//         ? ((currentQuestion + 1) / questions.length) * 100

//         : 0;
//     if (!started)

//         return (

//             <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center">

//                 <div className="bg-slate-800/90 backdrop-blur-lg w-[500px] rounded-2xl shadow-2xl p-10 border border-slate-700">

//                     <h1 className="text-4xl font-bold text-white text-center">

//                         🎯 Start Interview

//                     </h1>

//                     <p className="text-gray-400 text-center mt-3">

//                         Select your interview category and begin.

//                     </p>

//                     <div className="mt-10">

//                         <label className="text-gray-300 block mb-3">

//                             Subject

//                         </label>

//                         <select

//                             value={subject}

//                             onChange={(e) => setSubject(e.target.value)}

//                             className="w-full p-4 rounded-xl bg-slate-700 text-white border border-slate-600 focus:outline-none"

//                         >

//                             <option>DSA</option>

//                             <option>DBMS</option>

//                             <option>OS</option>

//                             <option>HR</option>

//                         </select>

//                         <button

//                             onClick={startInterview}

//                             disabled={loading}

//                             className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition-all p-4 rounded-xl text-lg font-semibold"

//                         >

//                             {

//                                 loading ?

//                                     "Loading Questions..."

//                                     :

//                                     "Start Interview"

//                             }

//                         </button>

//                     </div>

//                 </div>

//             </div>

//         );

//     return (

//         <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">

//             <div className="max-w-5xl mx-auto py-10 px-6">

//                 <div className="flex justify-between items-center">

//                     <div>

//                         <h1 className="text-4xl font-bold">

//                             AI Mock Interview

//                         </h1>

//                         <p className="text-gray-400 mt-2">

//                             Subject : {subject}

//                         </p>

//                     </div>

//                     <div className="bg-red-600 px-6 py-3 rounded-xl font-bold text-xl shadow-lg">

//                         ⏱ {formatTime(timeLeft)}

//                     </div>

//                 </div>

//                 <div className="mt-8">

//                     <div className="flex justify-between mb-2">

//                         <span>

//                             Question {currentQuestion + 1} / {questions.length}

//                         </span>

//                         <span>

//                             {Math.round(progress)}%

//                         </span>

//                     </div>

//                     <div className="w-full bg-slate-700 rounded-full h-3">

//                         <div

//                             className="bg-blue-500 h-3 rounded-full transition-all duration-500"

//                             style={{

//                                 width: `${progress}%`

//                             }}

//                         ></div>

//                     </div>

//                 </div>

//                 <div className="bg-slate-800 mt-10 rounded-2xl shadow-xl p-10 border border-slate-700">

//                     <div className="flex justify-between items-center">

//                         <span className="bg-blue-600 px-4 py-2 rounded-full">

//                             {questions[currentQuestion].difficulty}

//                         </span>

//                         <span className="text-gray-400">

//                             {questions[currentQuestion].topic}

//                         </span>

//                     </div>

//                     <h2 className="text-2xl font-semibold mt-8 leading-relaxed">

//                         {questions[currentQuestion].question}

//                     </h2>

//                     <textarea

//                         rows={8}

//                         value={answers[questions[currentQuestion]._id] || ""}

//                         onChange={(e) =>

//                             handleAnswer(e.target.value)

//                         }

//                         placeholder="Write your answer here..."

//                         className="mt-8 w-full rounded-xl p-5 bg-white text-black resize-none focus:outline-none"

//                     />

//                     <div className="flex justify-between mt-10">

//                         <button

//                             onClick={previousQuestion}

//                             disabled={currentQuestion === 0}

//                             className="bg-gray-600 hover:bg-gray-700 disabled:opacity-40 px-8 py-3 rounded-xl transition"

//                         >

//                             ← Previous

//                         </button>

//                         {

//                             currentQuestion === questions.length - 1 ?

//                                 (

//                                     <button

//                                         onClick={submitInterview}

//                                         disabled={submitting}

//                                         className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl transition"

//                                     >

//                                         {

//                                             submitting ?

//                                                 "Submitting..."

//                                                 :

//                                                 "Finish Interview"

//                                         }

//                                     </button>

//                                 )

//                                 :

//                                 (

//                                     <button

//                                         onClick={nextQuestion}

//                                         disabled={!answers[questions[currentQuestion]._id]}

//                                         className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 px-8 py-3 rounded-xl transition"

//                                     >

//                                         Next →

//                                     </button>

//                                 )

//                         }

//                     </div>

//                 </div>

//             </div>

//         </div>

//     );

// };

// export default Interview;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Interview = () => {

    const navigate = useNavigate();

    const [subject, setSubject] = useState("DSA");

    const [questions, setQuestions] = useState([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState({});

    const [started, setStarted] = useState(false);

    const [interviewId, setInterviewId] = useState("");

    // 5 Minutes

    const [timeLeft, setTimeLeft] = useState(300);

    //----------------------------------------------------------

    useEffect(() => {

        if (!started) return;

        if (timeLeft === 0) {

            submitInterview();

            return;

        }

        const timer = setInterval(() => {

            setTimeLeft(prev => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [started, timeLeft]);

    //----------------------------------------------------------

    const startInterview = async () => {

        try {

            const res = await api.post("/interview/start", {

                subject

            });

            setInterviewId(res.data.interviewId);

            setQuestions(res.data.questions);

            setStarted(true);

        }

        catch (err) {

            console.log(err);

        }

    };

    //----------------------------------------------------------

    const handleAnswer = (value) => {

        setAnswers({

            ...answers,

            [questions[currentQuestion]._id]: value

        });

    };

    //----------------------------------------------------------

    const nextQuestion = () => {

        if (currentQuestion < questions.length - 1)

            setCurrentQuestion(currentQuestion + 1);

    };

    //----------------------------------------------------------

    const previousQuestion = () => {

        if (currentQuestion > 0)

            setCurrentQuestion(currentQuestion - 1);

    };

    //----------------------------------------------------------

    const jumpToQuestion = (index) => {

        setCurrentQuestion(index);

    };

    //----------------------------------------------------------
    const submitInterview = () => {

        const formattedAnswers = questions.map((q) => ({

            questionId: q._id,

            answer: answers[q._id] || ""

        }));

        navigate("/evaluation", {

            state: {

                interviewId,

                answers: formattedAnswers

            }

        });

    };
    //--------------------------------------------------

    const bookmarkQuestion = async () => {

        try {

            await api.post(

                `/bookmark/${questions[currentQuestion]._id}`

            );

            alert("Question Bookmarked ⭐");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Bookmark Failed"

            );

        }

    };
    //----------------------------------------------------------

    const formatTime = () => {

        const minutes = Math.floor(timeLeft / 60);

        const seconds = timeLeft % 60;

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;

    };

    //----------------------------------------------------------

    const progress =

        ((currentQuestion + 1) / questions.length) * 100;

    //----------------------------------------------------------

    if (!started)

        return (

            <div className="min-h-screen bg-slate-900 flex justify-center items-center">

                <div className="bg-slate-800 p-10 rounded-2xl shadow-xl w-[450px]">

                    <h1 className="text-white text-4xl font-bold text-center">

                        Start Interview

                    </h1>

                    <p className="text-gray-400 text-center mt-3">

                        Select your subject and begin your mock interview.

                    </p>

                    <select

                        className="w-full mt-8 p-3 rounded-lg bg-slate-700 text-white"

                        value={subject}

                        onChange={(e) =>

                            setSubject(e.target.value)

                        }

                    >

                        <option>DSA</option>

                        <option>DBMS</option>

                        <option>OS</option>

                        <option>HR</option>

                    </select>

                    <button

                        onClick={startInterview}

                        className="bg-blue-600 hover:bg-blue-700 transition mt-8 w-full p-3 rounded-lg text-white text-lg"

                    >

                        🚀 Start Interview

                    </button>

                </div>

            </div>

        );

    //----------------------------------------------------------
    //----------------------------------------------------------

    return (

        <div className="min-h-screen bg-slate-900 text-white p-8">

            {/* Header */}

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-4xl font-bold">

                        Mock Interview

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Answer all questions before submitting.

                    </p>

                </div>

                <div className="bg-red-600 px-6 py-3 rounded-xl text-2xl font-bold">

                    ⏱ {formatTime()}

                </div>

            </div>

            {/* Progress */}

            <div className="mb-8">

                <div className="flex justify-between mb-2">

                    <span>

                        Progress

                    </span>

                    <span>

                        {currentQuestion + 1} / {questions.length}

                    </span>

                </div>

                <div className="w-full h-3 bg-slate-700 rounded-full">

                    <div

                        className="h-3 bg-blue-500 rounded-full transition-all duration-300"

                        style={{

                            width: `${progress}%`

                        }}

                    />

                </div>

            </div>

            {/* Question Palette */}

            <div className="flex flex-wrap gap-3 mb-8">

                {

                    questions.map((question, index) => (

                        <button

                            key={question._id}

                            onClick={() => jumpToQuestion(index)}

                            className={`

                            w-12

                            h-12

                            rounded-full

                            font-bold

                            transition

                            ${currentQuestion === index

                                    ?

                                    "bg-blue-600"

                                    :

                                    answers[question._id]

                                        ?

                                        "bg-green-600"

                                        :

                                        "bg-slate-700"

                                }

                            hover:scale-110

                            `}

                        >

                            {index + 1}

                        </button>

                    ))

                }

            </div>

            {/* Question */}

            <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">

                <h2 className="text-2xl font-bold mb-6">

                    Question {currentQuestion + 1}

                </h2>

                <p className="text-xl leading-9">

                    {questions[currentQuestion].question}

                </p>

                <textarea

                    rows={10}

                    className="w-full mt-8 rounded-xl p-5 text-black"

                    placeholder="Type your answer here..."

                    value={

                        answers[questions[currentQuestion]._id] || ""

                    }

                    onChange={(e) =>

                        handleAnswer(e.target.value)

                    }

                />

                <div className="flex justify-between mt-10">

                    <button

                        onClick={previousQuestion}

                        disabled={currentQuestion === 0}

                        className={`

                        px-8

                        py-3

                        rounded-xl

                        ${currentQuestion === 0

                                ?

                                "bg-slate-700 cursor-not-allowed"

                                :

                                "bg-gray-600 hover:bg-gray-700"

                            }

                        `}

                    >

                        ← Previous

                    </button>

                    {

                        currentQuestion === questions.length - 1

                            ?

                            (

                                <button

                                    onClick={() => {

                                        const confirmSubmit = window.confirm(

                                            "Submit Interview?"

                                        );

                                        if (confirmSubmit)

                                            submitInterview();

                                    }}

                                    className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl"

                                >

                                    ✅ Submit Interview

                                </button>

                            )

                            :

                            (

                                <button

                                    onClick={nextQuestion}

                                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl"

                                >

                                    Next →

                                </button>

                            )

                    }

                </div>

            </div>

        </div>

    );

};

export default Interview;