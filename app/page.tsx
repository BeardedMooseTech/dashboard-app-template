"use client";
import { Suspense, useEffect, useState, useRef } from "react";
import { Stack, LinearProgress, Box, Paper, Typography } from "@mui/material";
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
        <Slide
          alt={isAltTheme}
          title="In Progress"
          content={new Array(1).fill(null)}
        />
        <Slide alt={isAltTheme} title="To Close">
          <Box sx={{ margin: `1em 2em 0 2em`, width: "100%" }}>
            <Stack spacing={5}>
              {new Array(4).fill(null).map((_, index) => {
                const offset = index  * 10;
                return (
                <Paper key={index} elevation={4} sx={{ padding: "1em", backgroundColor: "transparent", color: isAltTheme ? "#000" : "#fff" }}>
                  <Stack spacing={2}>
                  <Typography variant="h1" gutterBottom>
                    MO12345{index}
                  </Typography>
                  <LinearProgress
                    key={index}
                    variant="buffer"
                    value={progress < 100 ? progress - offset : 100}
                    
                    sx={{
                      height: "4em",
                      borderRadius: "5em",
                      backgroundColor: "transparent",
                      "& .MuiLinearProgress-bar1Buffer": {
                        borderRadius: "5em",
                        backgroundColor: "var(--accent-color)",
                      },
                      "& .MuiLinearProgress-bar2Buffer": {
                        borderRadius: "5em",
                        backgroundColor: "var(--primary-color)",
                      },
                      "& .MuiLinearProgress-dashed": {
                        backgroundImage: `radial-gradient(var(--accent-color) 0%, var(--accent-color) 16%, transparent 42%)`,
                      },
                    }}
                  />
                  </Stack>
                </Paper>
              )})}
            </Stack>
          </Box>
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
