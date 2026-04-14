import Image from "next/image";

import styles from "./header.module.css";

export type HeaderProps = {
  title: string;
  alt?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, alt }) => {
  return (
    <header className={styles.header}>
      <Image src={alt ? "/logo-alt.png" : "/logo.png"} alt="Pedone Pinsa" width={50} height={50} />
      <h3 className={`${alt ? 'text-inherit': 'text-white'} text-3xl font-bold`}>{title}</h3>
      <h3 className={`${alt ? 'text-inherit': 'text-white'} text-xl font-bold`}>{new Date().toLocaleDateString()}</h3>
    </header>
  );
};

export default Header;
