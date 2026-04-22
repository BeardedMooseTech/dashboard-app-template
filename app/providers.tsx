"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-muller), sans-serif",
    h1: {
      fontFamily: "var(--font-kapra-semibold), sans-serif",
    },
    h2: {
      fontFamily: "var(--font-kapra-semibold), sans-serif",
    },
    h3: {
      fontFamily: "var(--font-kapra-semibold), sans-serif",
    },
    h4: {
      fontFamily: "var(--font-kapra-semibold), sans-serif",
    },
    h5: {
      fontFamily: "var(--font-kapra-semibold), sans-serif",
    },
    h6: {
      fontFamily: "var(--font-kapra-semibold), sans-serif",
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}