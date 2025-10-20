"use client";
import React from "react";
import Spinner from "../../components/Spinner";
import styles from "./Play.module.css";

export default function FinishOverlay() {
  return (
    <div className={styles.finishOverlay}>
      <div className={styles.finishContainer}>
        <Spinner size={60} />
        <p className={styles.loadingText}>Preparing your results...</p>
      </div>
    </div>
  );
}