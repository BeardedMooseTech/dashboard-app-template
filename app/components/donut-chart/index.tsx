"use client";
import { useCallback, useState, useEffect, act } from "react";

import styles from "./donutChart.module.css";

export type DonutChartProps = {
  actual: number;
  expected: number;
  manufacturingOrder: string;

  className?: string;
  style?: React.CSSProperties;
};

const DonutChart: React.FC<DonutChartProps> = ({
  actual,
  expected,
  manufacturingOrder = "MO123456",

  style = {},
  className = "h-96 w-96",
}) => {
  const [percent, setPercent] = useState(
    Math.floor(Math.random() * 20) + 1 || 0
  );

  const calcX = useCallback(() => {
    if (percent < 10) {
      return "15";
    } else if (percent < 100) {
      return "13";
    } else {
      return "8";
    }
  }, [percent]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev + 1) % 101);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      viewBox="0 0 42 42"
      style={{ ...style }}
      className={`${className} ${styles.donutChart}`}
    >
      <circle
        cx="20.8"
        cy="21"
        r="20"
        fill="transparent"
        stroke="#FFFFFF"
        strokeWidth=".1"
      />
      <circle
        cx="21"
        cy="21"
        r="15.9"
        id="inner-circle"
        className={styles.innerCircle}
      />

      <circle
        cx="21"
        cy="21"
        r="15.9"
        id="outer-circle"
        className={styles.outerCircle}
        strokeDashoffset={100 - percent}
      />

      <text
        className={`${styles.text} ${styles.textSmall} font-normal`}
        x="15.25"
        y="-26.5"
      >
        {manufacturingOrder}
      </text>

      <text
        className={`${styles.text} ${styles.textLarge}`}
        x={calcX()}
        y="-42%"
      >
        {`${percent}%`}
      </text>
      <text className={`${styles.text} ${styles.textSmall}`} x="15.25" y="-14">
        PROGRESS
      </text>

      <circle cx="35" cy="34.25" r="3" fill="var(--background-color)" />

      <text className={`${styles.text} ${styles.textSmall}`} x="32.75" y="-35">
        {expected}
      </text>
      <text className={`${styles.text} ${styles.smallLabel}`} x="33" y="-33.5">
        Goal
      </text>

      <circle cx="8.25" cy="6.5" r="3" fill="var(--background-color)" />
      <text className={`${styles.text} ${styles.textSmall}`} x="5.35" y="-7.95">
        {actual}
      </text>
      <text
        className={`${styles.text} ${styles.smallLabel}`}
        x="4.75"
        y="-6.35"
      >
        Done
      </text>
    </svg>
  );
};

export default DonutChart;
