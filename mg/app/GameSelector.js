"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ArrowUp } from "lucide-react";

export default function GameSelector({ difficulty: propDifficulty }) {
  const router = useRouter();
  const [selectedGames, setSelectedGames] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [searchTerm, setSearchTerm] = useState("");
  const hasShownAlert = useRef(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleSearchUpdate = (e) => {
      setSearchTerm(e.detail);
    };
    const handleDifficultyUpdate = (e) => {
      setDifficulty(e.detail);
    };
    window.addEventListener("searchUpdate", handleSearchUpdate);
    window.addEventListener("difficultyUpdate", handleDifficultyUpdate);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight / 2);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("searchUpdate", handleSearchUpdate);
      window.removeEventListener("difficultyUpdate", handleDifficultyUpdate);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (propDifficulty) {
      setDifficulty(propDifficulty);
    }
  }, [propDifficulty]);

  const games = [
      { name: "🎲 Randomize (Any Category)", categoryId: "any", emoji: "🎲", isRandom: true, challenge: "Take the Risk!" },
      { name: "General Knowledge", categoryId: 9, emoji: "🧠", image: "/images/genralKnowledge.webp", challenge: "Prove Your Smarts!" },
      { name: "Books", categoryId: 10, emoji: "📚", image: "/images/books.webp", challenge: "Outread Me!" },
      { name: "Film", categoryId: 11, emoji: "🎬", image: "/images/Films.webp", challenge: "Catch Every Scene!" },
      { name: "Music", categoryId: 12, emoji: "🎵", image: "/images/Music.webp", challenge: "Feel the Rhythm!" },
      { name: "Television", categoryId: 14, emoji: "📺", image: "/images/televisions.webp", challenge: "Remember That Show?" },
      { name: "Video Games", categoryId: 15, emoji: "🎮", image: "/images/Games.webp", challenge: "Beat the Level!" },
      { name: "Board Games", categoryId: 16, emoji: "🎲", image: "/images/BoardGames.webp", challenge: "Roll & Win!" },
      { name: "Science & Nature", categoryId: 17, emoji: "🔬", image: "/images/sciencNnature.webp", challenge: "Discover the Truth!" },
      { name: "Computers", categoryId: 18, emoji: "💻", image: "/images/computers.webp", challenge: "Crack the Code!" },
      { name: "General Math", categoryId: 19, emoji: "➗", image: "/images/GenralMaths.webp", challenge: "Solve It Fast!" },
      { name: "Mathematical Equations", emoji: "➕➖✖️", customType: "mathEq", categoryId: 9999, image: "/images/mathEquations.webp", challenge: "Master the Equation!" },
      { name: "Sports", categoryId: 21, emoji: "⚽🏀🏈🎾", image: "/images/Sports.webp", challenge: "Prove Your Skills!" },
      { name: "Geography", categoryId: 22, emoji: "🌍", image: "/images/geography.webp", challenge: "Name Every Place!" },
      { name: "History", categoryId: 23, emoji: "📜", image: "/images/History.webp", challenge: "Beat the Past!" },
      { name: "Politics", categoryId: 24, emoji: "🏛️", image: "/images/politics.webp", challenge: "Rule the Game!" },
      { name: "Art", categoryId: 25, emoji: "🎨", image: "/images/Art.webp", challenge: "Create a Masterpiece!" },
      { name: "Celebrities", categoryId: 26, emoji: "⭐", image: "/images/celebrities.webp", challenge: "Spot the Star!" },
      { name: "Animals", categoryId: 27, emoji: "🐾", image: "/images/Animals.webp", challenge: "Name Them All!" },
      { name: "Vehicles", categoryId: 28, emoji: "🚗", image: "/images/vehicles.webp", challenge: "Speed Through It!" },
      { name: "Comics", categoryId: 29, emoji: "💥", image: "/images/comics.webp", challenge: "Be the Hero!" },
      { name: "Gadgets", categoryId: 30, emoji: "📱", image: "/images/Gadgets.webp", challenge: "Know Your Tech!" },
      { name: "Cartoon & Animations", categoryId: 32, emoji: "🎬", image: "/images/Cartoons.webp", challenge: "Can You Name Every Character!?" },
  ];
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleGame = (gameId) => {
    setSelectedGames((prev) => {
      if (prev.includes(gameId)) {
        if (gameId === 26) {
          hasShownAlert.current = false;
          const newDifficulty = "easy";
          setDifficulty(newDifficulty);
          window.dispatchEvent(new CustomEvent("difficultyUpdate", { detail: newDifficulty }));
        }
        return [];
      }
      
      if (gameId === 26 && !hasShownAlert.current) {
        hasShownAlert.current = true;
        alert("📢 Notice: The Celebrities category is only available in Medium difficulty. Difficulty has been automatically set to Medium.");
        const newDifficulty = "medium";
        setDifficulty(newDifficulty);
        window.dispatchEvent(new CustomEvent("difficultyUpdate", { detail: newDifficulty }));
      } else if (gameId !== 26) {
        hasShownAlert.current = false;
        const newDifficulty = "easy";
        setDifficulty(newDifficulty);
        window.dispatchEvent(new CustomEvent("difficultyUpdate", { detail: newDifficulty }));
      }

      return [gameId];
    });
  };

 const handleStartGame = () => {
    if (selectedGames.length === 0) {
      alert("Please select at least one category!");
      return;
    }

    const selectedGame = games.find(g => g.categoryId === selectedGames[0]);


    try {
      localStorage.setItem("selectedGames", JSON.stringify(selectedGames));
      localStorage.setItem("difficulty", difficulty);

      if (selectedGame.customType) {
        localStorage.setItem("customType", selectedGame.customType);
      } else {
        localStorage.removeItem("customType");
      }

      router.push("/play");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Error starting game. Please try again.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.controls}>
        <div className={styles.selectedCount}>
          <div className={styles.difficultySelector}>
            <button
              onClick={() => {
                const newDifficulty = "easy";
                setDifficulty(newDifficulty);
                window.dispatchEvent(new CustomEvent("difficultyUpdate", { detail: newDifficulty }));
              }}
              className={`${styles.difficultyBtn} ${difficulty === "easy" ? styles.active : ""} ${selectedGames.includes(26) ? styles.disabled : ""}`}
              disabled={selectedGames.includes(26)}
            >
              Easy
            </button>
            <button
              onClick={() => {
                const newDifficulty = "medium";
                setDifficulty(newDifficulty);
                window.dispatchEvent(new CustomEvent("difficultyUpdate", { detail: newDifficulty }));
              }}
              className={`${styles.difficultyBtn} ${difficulty === "medium" ? styles.active : ""}`}
            >
              Medium
            </button>
            <button
              onClick={() => {
                const newDifficulty = "hard";
                setDifficulty(newDifficulty);
                window.dispatchEvent(new CustomEvent("difficultyUpdate", { detail: newDifficulty }));
              }}
              className={`${styles.difficultyBtn} ${difficulty === "hard" ? styles.active : ""} ${selectedGames.includes(26) ? styles.disabled : ""}`}
              disabled={selectedGames.includes(26)}
            >
              Hard
            </button>
          </div>
        </div>
      </div>

      <div className={styles.categoriesGrid}>
          {filteredGames.map((game) => (
              <div
                key={game.categoryId}
                onClick={() => toggleGame(game.categoryId)}
                className={`${styles.categoryCard} ${selectedGames.includes(game.categoryId) ? styles.selected : ""} ${game.categoryId === 26 && difficulty !== "medium" ? styles.disabledCard : ""}`}
                style={game.image ? {
                  backgroundImage: `url(${game.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                } : {}}
              >
                <div className={styles.categoryOverlay}>
                  <div className={styles.categoryEmoji}>{game.emoji}</div>
                  <div className={styles.categoryName}>{game.name}</div>
                  {game.challenge && (
                    <div className={styles.challengeText}>{game.challenge}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            position: 'fixed', 
            bottom: '0', 
            left: '0', 
            right: '0', 
            padding: '20px', 
            display: 'flex',
            justifyContent: 'center',
            zIndex: '100'
          }}>
        <button
          onClick={handleStartGame}
          className="btn-primary"
          style={{
            padding: "16px 48px",
            fontSize: "1.1rem",
            opacity: selectedGames.length === 0 ? "0.5" : "1",
            cursor: selectedGames.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          {selectedGames.length === 0 ? "Select a Category" : `Start Game`}
        </button>
      </div>

      <button
        onClick={scrollToTop}
        className={`${styles.scrollToTop} ${showScrollTop ? styles.visible : ''}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}