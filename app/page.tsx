"use client";
import DonutChart from "./components/donut-chart";
import dynamic from "next/dynamic";

const Slides = dynamic(() => import("@/app/components/slides"), { ssr: false });

import styles from "./main.module.css";
import Header from "./components/header";

const slideStyles: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  overflow: "auto",
};

const Slide: React.FC<{ content: Array<any> }> = ({ content }) => {
  return (
    <section className="h-full w-full">
      <div style={slideStyles} className="h-full w-full">
        {content.map((slide, index) => (
          <div key={index} className="flex-1 flex justify-center items-center">
            <DonutChart
              actual={27}
              expected={100}
              className="max-w-3xl w-full h-full"
              manufacturingOrder={`MO12345${index}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default function Devices() {
  return (
    <div className={`${styles.main} w-screen h-screen`}>
      <Header title="Sample PINSA Dashboard" />
      <Slides className="h-full w-full">
        <Slide content={new Array(1).fill(null)} />
        <Slide content={new Array(2).fill(null)} />
        <Slide content={new Array(3).fill(null)} />
        <Slide content={new Array(4).fill(null)} />
        <Slide content={new Array(5).fill(null)} />
        <Slide content={new Array(6).fill(null)} />
      </Slides>
    </div>
  );
}
