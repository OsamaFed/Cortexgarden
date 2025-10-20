
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Results.module.css";

export default function ResultsPage() {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const finalScore = Number(localStorage.getItem("score")) || 0;
    const correctAnswers = Number(localStorage.getItem("correctAnswers")) || 0;
    const totalQuestions = Number(localStorage.getItem("totalQuestions")) || 0;
    
    setScore(finalScore);
    setCorrect(correctAnswers);
    setTotal(totalQuestions);
    setPercentage(totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0);
  }, []);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: "Outstanding! 🎉", emoji: "🏆", color: "var(--success)" };
    if (percentage >= 70) return { text: "Great Job! 👏", emoji: "⭐", color: "var(--primary)" };
    if (percentage >= 50) return { text: "Good Effort! 💪", emoji: "👍", color: "var(--secondary)" };
    return { text: "Keep Practicing! ", emoji: "💡", color: "var(--error)" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className={styles.container}>
      <div className={styles.resultCard}>
        <div className={styles.emojiContainer}>
          <span className={styles.mainEmoji}>{performance.emoji}</span>
        </div>

        <h1 className={styles.title} style={{ color: performance.color }}>
          {performance.text}
        </h1>

        <div className={styles.scoreSection}>
          <div className={styles.mainScore}>
            <span className={styles.scoreLabel}>Final Score</span>
            <span className={styles.scoreValue}>{score}</span>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{correct}</span>
              <span className={styles.statLabel}>Correct</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{total - correct}</span>
              <span className={styles.statLabel}>Wrong</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{percentage}%</span>
              <span className={styles.statLabel}>Accuracy</span>
            </div>
          </div>

          <div className={styles.progressBarContainer}>
            <div 
              className={styles.progressBar} 
              style={{ 
                width: `${percentage}%`,
                backgroundColor: performance.color 
              }}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            onClick={() => router.push("/all-games")} 
            className="btn-secondary"
          >
            🏠 Back to Home
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem("score");
              localStorage.removeItem("correctAnswers");
              localStorage.removeItem("totalQuestions");
              router.push("/play");
            }} 
            className="btn-primary"
          >
            🔄 Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
