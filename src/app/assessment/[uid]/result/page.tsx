"use client";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/app/Redux_Store/store/store";
import { useEffect, useState } from "react";
import { useFetchStudentResult } from "@/app/Hooks/useFetchStudentResult";
import Header from "@/app/Components/Homepage/Header";
import { useResultCalculator } from "@/app/Hooks/useResultCalculator";
import { useUpdateUserLevel } from "@/app/Hooks/useUpdateUserLevel";
import { useAuthVerify } from "@/app/Hooks/useAuthVerify";

const ResultPage = () => {
  const param = useParams();
  const router = useRouter();
  const { uid } = param;
  const user = useAppSelector((state) => state.auth.user);
  const { userData, verifyAuth } = useAuthVerify();

  const { calculate } = useResultCalculator();
  const { updateUserLevel } = useUpdateUserLevel();

  const { fetchResult, loading, error, result } = useFetchStudentResult();
  // eslint-disable-next-line
  const [questions, setQuestions] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState("");
  const [userCurrentLevel, setUserCurrentLevel] = useState<string>("");

  useEffect(() => {
    fetch("/Qustions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data.levels[0].questions));
  }, []);

  useEffect(() => {
    if (!user || user.uid !== uid) {
      router.push("/");
      return;
    }
    if (user.email) {
      fetchResult(user.email);
    }
    // eslint-disable-next-line
  }, [user, uid]);

  useEffect(() => {
    if (
      result &&
      result.examsHistory &&
      result.examsHistory.length > 0 &&
      questions.length > 0
    ) {
      const lastExam = result.examsHistory[result.examsHistory.length - 1];
      let tempScore = 0;
      // eslint-disable-next-line
      lastExam.examResults.forEach((ans: any) => {
        const q = questions.find((q) => q.id === ans.questionId);
        if (q && ans.answer === q.correctOptionId) {
          tempScore += q.marks;
        }
      });
      setScore(tempScore);
    }
  }, [result, questions]);

  useEffect(() => {
    verifyAuth();
    setUserCurrentLevel(userData?.level || "");
    return () => {
      void verifyAuth();
    };
    // eslint-disable-next-line
  }, [userData]);

  const lastExam =
    result &&
    result.examsHistory &&
    result.examsHistory.length > 0 &&
    result.examsHistory[result.examsHistory.length - 1];

  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 1), 0);
  const percentage = totalMarks ? Math.round((score / totalMarks) * 100) : 0;

  const calcResult = calculate({
    totalScore: score,
    totalMarks: totalMarks,
    step: 1,
  });

  useEffect(() => {
    if (
      user?.email &&
      calcResult.nextLevel &&
      currentLevel !== calcResult.nextLevel
    ) {
      updateUserLevel(user.email, calcResult.nextLevel).then((res) => {
        if (res && res.updatedLevel) {
          setCurrentLevel(res.updatedLevel);
        }
      });
    }
    // eslint-disable-next-line
  }, [calcResult.nextLevel]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto mt-12 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white p-8 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1">
              Assessment Result
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              {user?.email} | Current Level:{" "}
              <span className="font-semibold">{userCurrentLevel}</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold text-green-500">
              {score} / {totalMarks}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Total Score
            </span>
          </div>
        </div>

        {/* Score Bar */}
        <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-4 mb-8">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mb-8">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            0%
          </span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            100%
          </span>
        </div>

        {/* Pass/Fail Badge */}
        <div className="mb-8 flex items-center gap-4">
          {percentage >= 60 ? (
            <span className="inline-block px-4 py-1 bg-green-600 text-white rounded-full font-semibold">
              Passed
            </span>
          ) : (
            <span className="inline-block px-4 py-1 bg-red-600 text-white rounded-full font-semibold">
              Failed
            </span>
          )}
          <span className="text-neutral-500 dark:text-neutral-400">
            {percentage >= 60
              ? "Congratulations! You have passed this level."
              : "You did not pass. Try again!"}
          </span>
        </div>

        {/* Detailed Answers */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Question Review</h2>
          <div className="space-y-4">
            {lastExam &&
              // eslint-disable-next-line
              lastExam.examResults.map((ans: any, idx: number) => {
                const q = questions.find((q) => q.id === ans.questionId);
                const isCorrect = q && ans.answer === q.correctOptionId;
                return (
                  <div
                    key={ans.questionId}
                    className={`p-5 rounded-xl border-2 ${
                      isCorrect
                        ? "border-green-400 bg-green-50 dark:bg-green-900/30"
                        : "border-red-400 bg-red-50 dark:bg-red-900/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-lg">
                        Q{idx + 1}: {ans.questionText}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          isCorrect
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Wrong"}
                      </span>
                    </div>
                    <div className="ml-2">
                      <p>
                        <span className="font-semibold">Your Answer:</span>{" "}
                        <span
                          className={
                            isCorrect
                              ? "text-green-700 dark:text-green-300"
                              : "text-red-700 dark:text-red-300"
                          }
                        >
                          
                          {// eslint-disable-next-line
                           q?.options.find((o: any) => o.id === ans.answer)
                            ?.text || (
                            <span className="italic text-neutral-400">
                              Not Answered
                            </span>
                          )}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">Correct Answer:</span>{" "}
                        <span className="text-blue-700 dark:text-blue-300">
                          {
                            q?.options.find(
                              // eslint-disable-next-line
                              (o: any) => o.id === q.correctOptionId
                            )?.text
                          }
                        </span>
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Time Taken: {ans.timeTakenSeconds} sec
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="my-8 flex flex-col md:flex-row items-center gap-4">
          <span className="text-lg font-semibold">Your Certification: </span>
          <span className="inline-block px-4 py-1 bg-blue-600 text-white rounded-full font-semibold">
            {calcResult.certification}
          </span>
          {calcResult.canProceed && (
            <button
              onClick={() => {
                // Next step logic
                // e.g., updateUserLevel(calcResult.nextLevel);
                // router.push("/assessment/step2");
              }}
              className="ml-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium shadow-md transition"
            >
              Proceed to Step 2
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultPage;
