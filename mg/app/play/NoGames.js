"use client";
import React from "react";
import styles from "./Play.module.css";

export default function NoGames() {
  return (
    <div className={styles.container}>
      <div className={styles.loadingState}>
        <div className={styles.loadingText}>No games available. Please select a category.</div>
        <button className="btn-primary" onClick={() => (window.location.href = "/all-games")}>
          Select Categories
        </button>
      </div>
    </div>
  );
}