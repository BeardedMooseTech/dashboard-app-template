"use client";
import dynamic from "next/dynamic";
const Slides = dynamic(() => import("@/app/components/slides"), { ssr: false });

export default function Devices() {
  return (
    <Slides title="Demo Dashboard">
      <section className="h-full w-full">
        <div className="h-full w-full grid items-center">
          <h1 className="text-4xl font-bold text-center">Slide 1</h1>
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
