import { useState } from "react";
import axios from "axios";

interface AnswerDetails {
  email: string;
  questionId: number;
  questionText: string;
  answer: string;
  timeTakenSeconds: number;

}

export default function useSubmitAnswers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

const submitAnswers = async (
  email: string,
  currentlevel: string,
  answers: AnswerDetails[]
) => {
  setLoading(true);
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
    // eslint-disable-next-line
  } catch (err:any) {
    setError(err);
  } finally {
    setLoading(false);
  }
};

  return { submitAnswers, loading, error, success };
}
