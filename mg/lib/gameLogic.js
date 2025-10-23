import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

export function useGameLogic(games) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(15);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const answerTimeoutRef = useRef(null);

  const currentGame = games?.[currentIndex] || null;

  const options = useMemo(() => {
    if (!currentGame) return [];
    return [currentGame.correct_answer, ...currentGame.incorrect_answers].sort(
      () => Math.random() - 0.5,
    );
  }, [currentGame]);

  const saveResults = useCallback((finalScore, finalCorrect, totalQuestions) => {
    try {
      localStorage.setItem("score", String(finalScore));
      localStorage.setItem("correctAnswers", String(finalCorrect));
      localStorage.setItem("totalQuestions", String(totalQuestions));
    } catch (error) {
      console.error("Error saving results to localStorage:", error);
    }
  }, []);

    const nextQuestion = useCallback((showAnswerFirst = false) => {
    if (showAnswerFirst) {
      setSelectedAnswer("timeout");
      setTimeout(() => {
        setSelectedAnswer(null);
        setTimer(15);
        if (currentIndex < games.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setGameFinished(true);
          const totalQuestions = games.length;
          saveResults(score, correctAnswers, totalQuestions);
          setTimeout(() => {
            router.push("/play/results");
          }, 1000);
        }
      }, 1700);
    } else {
      setSelectedAnswer(null);
      setTimer(15);
      if (currentIndex < games.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setGameFinished(true);
        const totalQuestions = games.length;
        saveResults(score, correctAnswers, totalQuestions);
        setTimeout(() => {
          router.push("/play/results");
        }, 1000);
      }
    }
  }, [currentIndex, games.length, score, correctAnswers, router, saveResults]);


  useEffect(() => {
    if (!games || games.length === 0) return;
    let interval;
    if (timer > 0 && !selectedAnswer && !gameFinished) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && !gameFinished && selectedAnswer !== "timeout") {
      nextQuestion(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, games, selectedAnswer, nextQuestion, gameFinished]);

  useEffect(() => {
    return () => {
      if (answerTimeoutRef.current) {
        clearTimeout(answerTimeoutRef.current);
      }
    };
  }, []);

  const handleAnswer = useCallback((answer) => {
    if (selectedAnswer || gameFinished) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === currentGame.correct_answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setCorrectAnswers((prev) => prev + 1);
    }

    answerTimeoutRef.current = setTimeout(() => {
      nextQuestion();
    }, 700);
  }, [selectedAnswer, currentGame, nextQuestion, gameFinished]);

  return {
    currentGame,
    options,
    selectedAnswer,
    timer,
    score,
    handleAnswer,
    gameFinished,
  };
}
