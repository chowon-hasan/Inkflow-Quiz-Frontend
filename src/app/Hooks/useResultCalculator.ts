// hooks/useResultCalculator.ts
export interface CalculatorResult {
  score: number;
  percentage: number;
  certification: string;
  canProceed: boolean;
  nextLevel?: string;
}

export function useResultCalculator() {
  // You can make this more dynamic for step 2/3
  function calculate({
    totalScore,
    totalMarks,
    step = 1,
  }: {
    totalScore: number;
    totalMarks: number;
    step?: number;
  }): CalculatorResult {
    const percentage = totalMarks
      ? Math.round((totalScore / totalMarks) * 100)
      : 0;
    let certification = "";
    let canProceed = false;
    let nextLevel = "";

    if (step === 1) {
      if (percentage < 25) {
        certification = "Fail (No retake allowed)";
      } else if (percentage < 50) {
        certification = "A1 Certified";
      } else if (percentage < 75) {
        certification = "A2 Certified";
      } else {
        certification = "A2 Certified";
        canProceed = true;
        nextLevel = "Sigma 1";
      }
    }


    return {
      score: totalScore,
      percentage,
      certification,
      canProceed,
      nextLevel,
    };
  }

  return { calculate };
}
