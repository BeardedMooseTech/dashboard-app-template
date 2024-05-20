import Image from "next/image";

import styles from "./header.module.css";

export type HeaderProps = {};

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className={styles.header}>
      <Image src="/logo.png" alt="Pinsa Romana" width={50} height={50} />
      <h3 className="text-xl font-bold">{new Date().toLocaleDateString()}</h3>
    </header>
  );
};

export default Header;
