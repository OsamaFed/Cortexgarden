"use client";
import React from "react";
import Spinner from "../../components/Spinner";
import styles from "./Play.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingState}>
      <div className={styles.loadingContainer}>
        <Spinner size={60} />
        <p className={styles.loadingText}>Loading questions...</p>
      </div>
    </div>
  );
}