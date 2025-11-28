import { useState } from 'react';

export const useCalorieCapture = () => {
  const [calories, setCalories] = useState<number | null>(null);

  const submitPrediction = (value: number) => {
    setCalories(value);
  };

  return {
    calories,
    submitPrediction,
  };
};

export default useCalorieCapture;
