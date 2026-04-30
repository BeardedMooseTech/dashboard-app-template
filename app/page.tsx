"use client";
import { Suspense, useEffect, useState, useRef } from "react";
import DonutChartNext from "./components/donut-cart-next";
import { useSearchParams } from "next/navigation";
import Slide from "./components/slides/slide";
import dynamic from "next/dynamic";

const Slides = dynamic(() => import("@/app/components/slides"), { ssr: false });

function DevicesContent() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");
  const isAltTheme = theme === "alt";
  const [mainClass, setMainClass] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadStyles = async () => {
      const styleModule = isAltTheme
        ? await import("./alt.module.css")
        : await import("./main.module.css");

      if (isMounted) {
        setMainClass(styleModule.default.main);
      }
    };

    loadStyles();

    return () => {
      isMounted = false;
    };
  }, [isAltTheme]);

  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress === 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        setProgress(progress + 1);
        if (buffer < 100 && progress % 5 === 0) {
          const newBuffer = buffer + 1 + Math.random() * 10;
          setBuffer(newBuffer > 100 ? 100 : newBuffer);
        }
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={`${mainClass} w-screen h-screen`}>
      <Slides className="h-full w-full">
        <Slide alt={isAltTheme} title="In Progress">
          <DonutChartNext productName="A fancy new product" manufacturingOrder="MO12345678" demo alt={isAltTheme} />
        </Slide>
      </Slides>
    </div>
  );
}

export default function Devices() {
  return (
    <Suspense fallback={<div className="w-screen h-screen" />}>
      <DevicesContent />
    </Suspense>
  );
}
