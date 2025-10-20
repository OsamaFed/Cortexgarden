"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMathQuestions, resetGames } from "../../store/Gameslice";
import "../globals.css";
import { ThemeToggle } from "../../components/ThemeToggle";
import { ArrowLeft } from "lucide-react";
import styles from "../page.module.css";


export default function MindTrain() {
  const router = useRouter();
  const dispatch = useDispatch();

  const mindGames = [
    { 
      name: "Mathematics Challenge", 
      path: "/play", 
      emoji: "➗", 
      description: "Test your math skills with timed questions",
      category: "math",
      type: "internal-math"
    }
  ];

  const handleGameSelect = async (game) => {
    try {
      if (game.type === "internal-math") {
        dispatch(resetGames());
        await dispatch(fetchMathQuestions(15)).unwrap();
        localStorage.setItem("gameType", "math");
        localStorage.setItem("difficulty", "hard");
        router.push(game.path);
      }
    } catch (error) {
      console.error("Error loading math questions:", error);
      alert("Failed to load the questions. Please try again.");
    }
  };

  return (
    <div className="mainContent">
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <button onClick={() => router.push("/")} className={styles.backButton} style={{ margin: 0 }}>
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 
          style={{ fontSize: "1.1rem", fontWeight: "600" }}
          className={styles.MindT}
        >
          Let’s see <span className={styles.highlight}>what you can solve</span>
        </h1>
        
        <ThemeToggle
          style={{
            position: "absolute",
            top: "2px"
          }}  
          />
      </nav>

      <div className="categoriesGrid">
        {mindGames.map((game) => (
          <div
            key={game.name}
            onClick={() => handleGameSelect(game)}
            className="categoryCard"
          >
            <div className="categoryEmoji">{game.emoji}</div>
            <div className="categoryName">{game.name}</div>
            <div className="categoryDescription">{game.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
