"use client";
import { useEffect, useRef } from "react";
import Reveal from "reveal.js";

import "reveal.js/dist/reveal.css";
import "./slides.css";
import Header from "./header";

const Slides: React.FC<{
  children: React.ReactNode;
  opts?: Reveal.Options;
  title?: string;
}> = ({
  title,
  children,
  opts = {
    disableLayout: true,
    autoSlide: 30000,
    transition: "slide",
    autoAnimate: true,
    loop: true,
    autoAnimateStyles: [
      "opacity",
      "color",
      "background-color",
      "padding",
      "font-size",
      "line-height",
      "letter-spacing",
      "border-width",
      "border-color",
      "border-radius",
      "outline",
      "outline-offset",
    ],
    autoAnimateEasing: "ease",
  },
}) => {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, opts);

    deckRef.current.initialize().then(() => {
      // good place for event handlers and plugin setups
    });

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn("Reveal.js destroy call failed.");
      }
    };
  }, [opts]);

  return (
    // Your presentation is sized based on the width and height of
    // our parent element. Make sure the parent is not 0-height.
    <div className="reveal" ref={deckDivRef}>
      <div className="slides">
        {title && <Header title={title} />}
        {children}
      </div>
    </div>
  );
};

export default Slides;
