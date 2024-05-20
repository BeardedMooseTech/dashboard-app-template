"use client";
import { useCallback } from "react";

import styles from "./donutChart.module.css";

export type DonutChartProps = {
  precentComplete: number;

  className?: string;
  style?: React.CSSProperties;
};

const DonutChart: React.FC<DonutChartProps> = ({
  style = {},
  precentComplete,
  className = "h-96 w-96",
}) => {
  const calcX = useCallback(() => {
    if (precentComplete < 10) {
      return "16";
    } else if (precentComplete < 100) {
      return "12";
    } else {
      return "8";
    }
  }, [precentComplete]);

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
        id="center"
        fill="#d18c00"
        className={styles.center}
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
        strokeDashoffset={100 - precentComplete}
      />

      <text
        className={`${styles.text} ${styles.textLarge}`}
        x={calcX()}
        y="-42%"
      >
        {`${precentComplete}%`}
      </text>
      <text className={`${styles.text} ${styles.textSmall}`} x="15.5" y="-14">
        PROGRESS
      </text>
    </svg>
  );
};

export default DonutChart;
