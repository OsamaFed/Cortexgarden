"use client";
import React from "react";
import styles from "./Spinner.module.css";

export default function Spinner({ size = 60 }) {
  return (
    <div className={styles.spinner} style={{ width: size, height: size }}>
      <div className={styles.spinnerCircle}></div>
    </div>
  );
}
