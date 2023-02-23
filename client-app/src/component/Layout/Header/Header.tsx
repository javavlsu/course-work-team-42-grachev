import React from "react";
import style from "./Header.module.scss";
import MenuIcon from "../../SvgIcons/MenuIcon";
import {Link} from "react-router-dom";
import PATHS from "../../../data/paths";
import UserLabel from "./UserLabel/UserLabel";

const Header = () => {
  return (
    <div className={style.wrapper}>
      <nav className={style.navigation}>
        <ul className={style.navList}>
          <li className={style.navItem}>
            <Link to={PATHS.MAIN}>
              <img src="/img/Layout/logo.png" alt="лого"/>
            </Link>
          </li>
          <li className={style.navItem}>
            <Link to={PATHS.PROGRAMS}>
              <MenuIcon className={style.icon}/>
              <span>Все специальности</span>
            </Link>
          </li>
          <li className={style.navItem}>
            <Link to={PATHS.EVENTS}>Мероприятия</Link>
          </li>
          <li className={style.navItem}>
            <Link to={PATHS.NEWS}>Новости</Link>
          </li>
          <li className={style.navItem}>
            <Link to={PATHS.CAREER}>Карьера</Link>
          </li>
          <li className={style.navItem}>
            <a href="tel:89190127950" className={style.tel}>
              8 919 012-79-50
            </a>
          </li>
          <li className={style.navItem}>
            <UserLabel/>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
