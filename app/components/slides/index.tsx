"use client";
import { useEffect, useRef } from "react";
import Reveal from "reveal.js";

import "reveal.js/dist/reveal.css";

import "./slides.css";

const DEFAULT_OPTS: Reveal.Options = {
  disableLayout: true,
  autoSlide: 30000,
  transition: "fade",
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
};

const Slides: React.FC<{
  children: React.ReactNode;
  opts?: Reveal.Options;
  title?: string;
  className?: string;
}> = ({
  title,
  children,
  className = "",
  opts,
}) => {
  const deckDivRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<Reveal.Api | null>(null);
  const optsRef = useRef<Reveal.Options>(opts ?? DEFAULT_OPTS);

  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, optsRef.current);

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
  }, []);

  return (
    // Your presentation is sized based on the width and height of
    // our parent element. Make sure the parent is not 0-height.
    <div className={`reveal ${className}`} ref={deckDivRef}>
      <div className="slides">{children}</div>
    </div>
  );
};

export default Slides;