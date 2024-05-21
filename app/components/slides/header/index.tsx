import Image from "next/image";

import styles from "./header.module.css";

export type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.header}>
      <Image src="/logo.png" alt="Pinsa Romana" width={50} height={50} />
      <h3 className="text-3xl font-bold">{title}</h3>
      <h3 className="text-xl font-bold">{new Date().toLocaleDateString()}</h3>
    </header>
  );
};

export default Header;
