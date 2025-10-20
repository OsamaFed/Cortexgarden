"use client";
import React from "react";
import styles from "./Play.module.css";

export default function Error({ message }) {
  return (
    <div className={styles.container}>
      <div className={styles.loadingState}>
        <div className={styles.loadingText}>Error: {message}</div>
        <button className="btn-primary" onClick={() => (window.location.href = "/all-games")}>
          Go Back
        </button>
      </div>
    </div>
  );
}