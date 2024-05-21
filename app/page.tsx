"use client";
import DonutChart from "./components/donut-chart";
import dynamic from "next/dynamic";

const Slides = dynamic(() => import("@/app/components/slides"), { ssr: false });

const slideStyles: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
};

const Slide: React.FC<{ content: Array<any> }> = ({ content }) => {
  return (
    <section className="h-full w-full">
      <div style={slideStyles} className="h-full w-full">
        {content.map((slide, index) => (
          <div key={index} className="flex-1 flex justify-center items-center">
            <DonutChart
              expected={100}
              actual={27}
              className="max-w-2xl p-10 w-full h-full"
              style={{ minWidth: 550, minHeight: 550 }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default function Devices() {
  return (
    <Slides title="Demo Dashboard">
      <Slide content={new Array(1).fill(null)} />
      <Slide content={new Array(2).fill(null)} />
      <Slide content={new Array(3).fill(null)} />
      <Slide content={new Array(4).fill(null)} />
      <Slide content={new Array(5).fill(null)} />
      <Slide content={new Array(6).fill(null)} />
    </Slides>
  );
}
