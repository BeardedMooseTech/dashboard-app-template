"use client";
import { useState, useEffect } from "react";

import DonutChart from "./components/donut-chart";
import Header from "./components/header";

import styles from "./main.module.css";

export default function Devices() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev + 1) % 101);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={`h-screen w-screen ${styles.main}`}>
      <Header />
      <DonutChart precentComplete={percent} className="h-3/4" />
    </main>
  );
}
