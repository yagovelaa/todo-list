import Logo from "../../assets/logo.svg";
import style from "./Header.module.css";

export function Header() {
  return (
    <header className={style.header}>
      <img src={Logo} alt="ToDo List" />
    </header>
  );
}
