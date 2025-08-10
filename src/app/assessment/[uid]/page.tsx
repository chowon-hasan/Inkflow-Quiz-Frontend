"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/app/Redux_Store/store/store";
import { useEffect, useState } from "react";
import useSubmitAnswers from "@/app/Hooks/useSubmitAnswers";
import { useAuthVerify } from "@/app/Hooks/useAuthVerify";

interface Question {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  marks: number;
}

interface AnswerDetails {
  email: string; 
  questionId: number; 
  questionText: string; 
  answer: string; 
  timeTakenSeconds: number; 
}

const AssessmentPage = () => {
  const { userData, verifyAuth } = useAuthVerify();
  const params = useParams();
  const router = useRouter();
  const { uid } = params;
  const user = useAppSelector((state) => state.auth.user);

  const [answers, setAnswers] = useState<AnswerDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showReadyPopup, setShowReadyPopup] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [IsQuizFinished, setIsQuizFinished] = useState(Boolean)
  const { submitAnswers} = useSubmitAnswers();
  const [userCurrentLevel, setUserCurrentLevel] = useState<string>("");

  useEffect(() => {
    verifyAuth();
    setUserCurrentLevel(userData?.level || "");

    // eslint-disable-next-line
  }, []);



  // Authentication and Data Fetching
  useEffect(() => {
    if (user === undefined) return;

    if (!user || user.uid !== uid) {
      router.push("/");
    } else {
      fetch("/Qustions.json")
        .then((res) => res.json())
        .then((data) => {
          setQuestions(data.levels[0].questions);
          setIsLoading(false);
        });
    }
  }, [user, uid, router]);

  // Timer Logic
  useEffect(() => {
    if (!quizStarted || showReadyPopup) return;

    if (timeLeft === 0) {
      // ⬅ টাইম শেষ হলে উত্তর না দিলেও next question-এ যাবে
      handleNextQuestion(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, showReadyPopup, timeLeft]); 


  useEffect(() => {
    if (quizStarted && !showReadyPopup) {
      setQuestionStartTime(Date.now()); 
    }
  }, [currentQuestionIndex, quizStarted, showReadyPopup]);

const handleNextQuestion = (timeUp = false) => {
  const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
  const answerObj: AnswerDetails = {
    email: user?.email || "unknown",
    questionId: questions[currentQuestionIndex].id,
    questionText: questions[currentQuestionIndex].question,
    answer: timeUp || !selectedOption ? "not_answered" : selectedOption,
    timeTakenSeconds: timeTaken,
  };

  setAnswers((prev) => [...prev, answerObj]);
  setSelectedOption(null);

  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex((prev) => prev + 1);
    setTimeLeft(60);
  } else {
    // End of quiz
    setQuizStarted(false);
    setIsQuizFinished(true); 
  }
};


  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const submit = async () => {
      if (IsQuizFinished && user?.email && !submitted) {
        setSubmitted(true);
        console.log("Final Answers:", answers);
        try {
          await submitAnswers(user.email, userCurrentLevel , answers );
          router.push(`/assessment/${user.uid}/result`);
        } catch (err) {
          console.error(err);
        }
      }
    };

    submit();
  }, [IsQuizFinished, user, submitted, answers, userCurrentLevel, router, submitAnswers]);


  const handleConfirm = () => {
    handleNextQuestion(false); 
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (showReadyPopup) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
        <div className="bg-neutral-800 p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Are you ready?</h2>
          <p className="text-gray-300 mb-6">
            You will have 1 minute for each question.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowReadyPopup(false);
                setQuizStarted(true);
                setQuestionStartTime(Date.now());
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Ready!
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const totalTime = totalQuestions * 60; // in seconds

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8 flex justify-center items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Question */}
        <div className="md:col-span-2 bg-neutral-800 p-8 rounded-2xl shadow-2xl">
          <div className="mb-6">
            <p className="text-lg text-gray-400">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
            <h2 className="text-3xl font-bold mt-2">
              {currentQuestion.question}
            </h2>
          </div>
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`p-5 rounded-lg border-2 transition cursor-pointer text-lg ${
                  selectedOption === option.id
                    ? "bg-blue-500 border-blue-400"
                    : "bg-neutral-700 border-transparent hover:bg-neutral-600"
                }`}
              >
                {option.text}
              </div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <button
              onClick={handleConfirm}
              disabled={!selectedOption}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Confirm
            </button>
          </div>
        </div>

        {/* Right Side: Timer */}
        <div className="bg-neutral-800 p-8 rounded-2xl shadow-2xl flex flex-col justify-center items-center text-center">
          <div className="mb-8">
            <p className="text-lg text-gray-400">Total Time</p>
            <p className="text-2xl font-bold">
              {Math.floor(totalTime / 60)} minutes
            </p>
          </div>
          <div>
            <p className="text-2xl text-gray-400 mb-2">Time Left</p>
            <p className="text-8xl font-extrabold text-green-400">{timeLeft}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
