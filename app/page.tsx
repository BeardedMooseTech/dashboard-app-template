"use client";
import DonutChart from "./components/donut-chart";
import Slides from "./components/slides";

const Slide: React.FC<{ content: Array<any> }> = ({ content }) => {
  console.log(content.length);

  const templateCols = content.length > 3 ? 3 : content.length;

  const slideStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${templateCols}, 1fr)`,
  };

  return (
    <section className="h-full w-full">
      <div style={slideStyles} className="h-full w-full">
        {content.map((slide, index) => (
          <div
            key={index}
            className="h-full w-full flex justify-center items-center"
          >
            <DonutChart expected={100} actual={27} className="max-w-2xl p-10" />
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
      {/* <Slide content={new Array(1).fill(null)} />
       <Slide content={new Array(2).fill(null)} />
       <Slide content={new Array(3).fill(null)} />
       <Slide content={new Array(4).fill(null)} />
       <Slide content={new Array(5).fill(null)} />
       <Slide content={new Array(6).fill(null)} /> */}
    </Slides>
  );
}
