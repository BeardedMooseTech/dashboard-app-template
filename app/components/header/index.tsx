"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type HeaderProps = {
  title: string;
  alt?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, alt }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTheme = alt ? "alt" : "default";
  const nextTheme = currentTheme === "alt" ? "default" : "alt";

  const handleThemeToggle = () => {
    const value = nextTheme;

    const params = new URLSearchParams(searchParams.toString());
    params.set("theme", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <AppBar position="static" color="transparent" className="mb-4 bg-inherit">
      <Toolbar className="flex justify-between gap-4">
        <Image
          src={alt ? "/logo-alt.png" : "/logo.png"}
          alt="Pedone Pinsa"
          width={50}
          height={50}
        />
        <Typography component="div" variant="h4" sx={{ color: alt ? "#000" : "#fff" }}>
          {title}
        </Typography>
        <div className="flex items-center gap-4">
          <Typography component="div" variant="h4" sx={{ color: alt ? "#000" : "#fff" }}>
            {new Date().toLocaleDateString()}
          </Typography>
          <IconButton
            onClick={handleThemeToggle}
            aria-label={`Switch to ${nextTheme} theme`}
            sx={{
              color: alt ? "#000" : "#fff",
              border: "1px solid",
              borderColor: alt ? "#000" : "#fff",
              borderRadius: "0.5rem",
              p: 1,
              "&:hover": {
                backgroundColor: "var(--accent-color)",
                color: "var(--primary-color)",
              },
            }}
          >
            {currentTheme === "alt" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
