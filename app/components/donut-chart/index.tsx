"use client";
import { useCallback, useState, useEffect } from "react";

import styles from "./donutChart.module.css";

export type DonutChartProps = {
  actual: number;
  expected: number;

  className?: string;
  style?: React.CSSProperties;
};

const DonutChart: React.FC<DonutChartProps> = ({
  style = {},
  expected,
  actual,
  className = "h-96 w-96",
}) => {
  const [percent, setPercent] = useState(0);

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
        className={`${styles.text} ${styles.textLarge}`}
        x={calcX()}
        y="-42%"
      >
        {`${percent}%`}
      </text>
      <text className={`${styles.text} ${styles.textSmall}`} x="15.5" y="-14">
        PROGRESS
      </text>
    </svg>
  );
};

export default DonutChart;
