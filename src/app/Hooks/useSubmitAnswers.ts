import { useState } from "react";
import axios from "axios";

interface AnswerDetails {
  email: string;
  questionId: number;
  questionText: string;
  answer: string;
  timeTakenSeconds: number;
//   currentlevel:string;
}

export default function useSubmitAnswers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

const submitAnswers = async (
  email: string,
  currentlevel: string,
  answers: AnswerDetails[]
) => {
  setLoading(true);
  setError(null);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/track-result/${email}`,
      {
        currentlevel,
        answers,
      }
    );
    setSuccess(true);
    return res.data;
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};

  return { submitAnswers, loading, error, success };
}
