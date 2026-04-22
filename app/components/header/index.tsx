import { AppBar, Toolbar, Typography } from "@mui/material";
import Image from "next/image";

export type HeaderProps = {
  title: string;
  alt?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, alt }) => (
  <AppBar position="static" color="transparent" className="mb-4 bg-inherit">
    <Toolbar className="flex justify-between">
      <Image
        src={alt ? "/logo-alt.png" : "/logo.png"}
        alt="Pedone Pinsa"
        width={50}
        height={50}
      />
      <Typography component="div" variant="h5" sx={{ color: alt ? "#000" : "#fff" }}>
        {title}
      </Typography>
      <Typography component="div" variant="h5" sx={{ color: alt ? "#000" : "#fff" }}>
        {new Date().toLocaleDateString()}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
