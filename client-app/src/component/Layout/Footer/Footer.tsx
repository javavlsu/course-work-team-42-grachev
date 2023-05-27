import React from "react";
import style from "./Footer.module.scss";
import ContactForm from "./ContactForm/ContactForm";
import {abiturient, student, aspirant, info} from "../../../data/footerInfo";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className={style.wrapper}>
      <ContactForm className={style.sova}/>
      <div className={style.footer}>
        <div className={style.information}>
          <img src="/img/Layout/logoWhite.png" alt="лого"/>
          <a href="tel:89190127950" className={style.tel}>
            8 919 012-79-50
          </a>
          <p className={style.address}>г. Владимир, пр. Строителей, дом 7Г </p>
          <a href="mailto:gggchaseggg@gmail.com" className={style.mail}>info@futureacademy.ru</a>
          <p className={style.info}>© ХОД, Future Academy</p>
        </div>
        <div className={style.abit}>
          <h4>Абитуриентам</h4>
          <ul>
            {abiturient.map((item, idx) => (
              <li key={idx} className={style.rentItem}>
                <Link to={item.url}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.stud}>
          <h4>Студентам</h4>
          <ul>
            {student.map((item, idx) => (
              <li key={idx} className={style.rentItem}>
                <Link to={item.url}>{item.text}</Link>
              </li>
            ))}</ul>
        </div>
        <div className={style.aspir}>
          <h4>Аспирантам</h4>
          <ul>
            {aspirant.map((item, idx) => (
              <li key={idx} className={style.rentItem}>
                <Link to={item.url}>{item.text}</Link>
              </li>
            ))}</ul>
        </div>
        <div className={style.univer}>
          <h4>Информация</h4>
          <ul>
            {info.map((item, idx) => (
              <li key={idx} className={style.rentItem}>
                <Link to={item.url}>{item.text}</Link>
              </li>
            ))}</ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
