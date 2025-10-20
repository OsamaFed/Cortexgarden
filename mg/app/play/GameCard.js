"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import styles from "./Play.module.css";
import he from "he";

export default function GameCard({ currentGame, options, selectedAnswer, handleAnswer, score, timer, gameFinished, onBack }) {
  return (
    <div className={styles.gameCard} style={{ pointerEvents: gameFinished ? 'none' : 'auto', opacity: gameFinished ? 0.5 : 1 }}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${(timer / 15) * 100}%`,
            backgroundColor: timer < 5 ? "var(--error)" : "var(--success)",
          }}
        ></div>
      </div>
      <button className={styles.backButton} onClick={onBack}>
        <ArrowLeft size={20} />
        Back
      </button>
      <div className={styles.header}>
        <div className={styles.timer}>
          <span>⏱️</span>
          <span>{timer}s</span>
        </div>
        <div className={styles.score}>
          <span>🏆</span>
          <span>{score}</span>
        </div>
      </div>
      {currentGame.categoryName && (
        <div className={styles.categoryBadge}>
          <span className={styles.categoryText}>📂 {currentGame.categoryName}</span>
        </div>
      )}
      <h3 className={styles.question}>{he.decode(currentGame.question)}</h3>
      <div className={styles.options}>
        {options.map((option, index) => {
          let btnClass = styles.optionBtn;
          if (selectedAnswer) {
            if (option === currentGame.correct_answer) btnClass += ` ${styles.correct}`;
            else if (option === selectedAnswer && selectedAnswer !== "timeout") btnClass += ` ${styles.wrong}`;
            else btnClass += ` ${styles.disabled}`;
          }
          return (
            <button key={index} onClick={() => handleAnswer(option)} disabled={!!selectedAnswer} className={btnClass}>
              {he.decode(option)}
            </button>
          );
        })}
      </div>
    </div>
  );
}