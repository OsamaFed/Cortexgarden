"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGameQuestions, resetGames, fetchMathQuestions } from "../../store/Gameslice";
import { useGameLogic } from "../../lib/gameLogic";
import { useRouter } from "next/navigation";
import styles from "./Play.module.css";
import Loading from "./Loading";
import Error from "./Error";
import NoGames from "./NoGames";
import FinishOverlay from "./FinishOverlay";
import GameCard from "./GameCard";

export default function Play() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { games = [], loading, error } = useSelector((state) => state.games || {});
  const initialized = useRef(false);
  const [noGamesConfirmed, setNoGamesConfirmed] = useState(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      dispatch(resetGames());
      const gameType = localStorage.getItem("gameType");
      const customType = localStorage.getItem("customType");
      if (gameType === "math") return;
      if (customType === "mathEq") {
        dispatch(fetchMathQuestions(15));
        return;
      }
      const difficulty = localStorage.getItem("difficulty") || "easy";
      const selectedGamesStr = localStorage.getItem("selectedGames") || "[]";
      const selectedGames = JSON.parse(selectedGamesStr);
      if (selectedGames.length === 0) {
        window.location.href = "/all-games";
        return;
      }
      dispatch(fetchGameQuestions({ categories: selectedGames, difficulty }));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!games || games.length === 0) {
      const timeout = setTimeout(() => {
        if (!games || games.length === 0) setNoGamesConfirmed(true);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setNoGamesConfirmed(false);
    }
  }, [games]);

  const { currentGame, options, selectedAnswer, timer, score, handleAnswer, gameFinished } =
    useGameLogic(games);

  const handleBack = () => {
    localStorage.removeItem("selectedGames");
    localStorage.removeItem("difficulty");
    localStorage.removeItem("customType");
    localStorage.removeItem("gameType");
    router.push("/all-games");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (noGamesConfirmed) return <NoGames />;
  if (!currentGame) return <Loading />;

  return (
    <div className={styles.container}>
      {gameFinished && <FinishOverlay />}
      <GameCard
        currentGame={currentGame}
        options={options}
        selectedAnswer={selectedAnswer}
        handleAnswer={handleAnswer}
        score={score}
        timer={timer}
        gameFinished={gameFinished}
        onBack={handleBack}
      />
    </div>
  );
}