"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GameSelector from "../GameSelector";
import { ThemeToggle } from "../../components/ThemeToggle";
import { ArrowLeft } from "lucide-react";
import styles from "../page.module.css";

export default function AllGames() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    window.dispatchEvent(new CustomEvent("searchUpdate", { detail: value }));
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    window.dispatchEvent(new CustomEvent("difficultyUpdate", { detail: newDifficulty }));
  };

  return (
    <div style={{ padding: "10px 20px" }}>
      <nav className={styles.topNav}>
        <button onClick={() => router.push("/")} className={styles.backButton}>
          <ArrowLeft size={20} />
          Back
        </button>

        <div style={{ display: "flex", gap: "16px", flex: 1, alignItems: "center", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
            style={{ flex: 1, maxWidth: "500px" }}
          />

          <div className={`${styles.difficultySelector} ${styles.desktopOnly}`}>
            <button
              onClick={() => handleDifficultyChange("easy")}
              className={`${styles.difficultyBtn} ${difficulty === "easy" ? styles.active : ""}`}
            >
              Easy
            </button>
            <button
              onClick={() => handleDifficultyChange("medium")}
              className={`${styles.difficultyBtn} ${difficulty === "medium" ? styles.active : ""}`}
            >
              Medium
            </button>
            <button
              onClick={() => handleDifficultyChange("hard")}
              className={`${styles.difficultyBtn} ${difficulty === "hard" ? styles.active : ""}`}
            >
              Hard
            </button>
          </div>
        </div>

        <div style={{ flexShrink: 0 }}>
          <ThemeToggle />
        </div>
      </nav>

      <GameSelector difficulty={difficulty} />
    </div>
  );
}