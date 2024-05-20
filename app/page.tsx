"use client";
import { useState, useEffect } from "react";

import DonutChart from "./components/donut-chart";
import dynamic from "next/dynamic";

const Slides = dynamic(() => import("@/app/components/slides"), { ssr: false });

export default function Devices() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev + 1) % 101);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Slides title="Demo Dashboard">
      <section className="h-full w-full">
        <div className="h-full w-full flex justify-center items-center">
          <DonutChart precentComplete={percent} className="h-1/2" />
        </div>
      </section>
      {/* <section className="h-full w-full">
        <section className="h-full w-full flex justify-center items-center">
          Slide 1.2
        </section>
      </section> */}
      <section className="h-full w-full">
        <div className="h-full w-full grid items-center">
          <h1 className="text-4xl font-bold text-center">Slide 2</h1>
        </div>
      </section>
    </Slides>
  );
}
