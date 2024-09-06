import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthUser } from "../hooksUser";
import scss from "./Navigation.module.scss";
import { AuthUser } from "../Interface/Interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setLanguage } from "../redux/language/sliceLanguage";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { Languages, langDictionary } from "../redux/language/constans";
import { GiWhiteBook } from "react-icons/gi";
export const Navigation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn }: AuthUser = useAuthUser();
  const currentLanguage = useSelector(selectLanguage);

  const handleChangeLanguage = () => {
    const newLanguage =
      currentLanguage === Languages.EN ? Languages.PL : Languages.EN;
    dispatch(setLanguage(newLanguage));
  };
  return (
    <nav className={scss.nav}>
      <div className={scss.title}>
        <GiWhiteBook size={50} />
        <p>{langDictionary.navPhonebook[currentLanguage]}</p>
      </div>
      <a className={scss.lang} onClick={handleChangeLanguage}>
        {currentLanguage}
      </a>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? scss.active : "")}>
        {langDictionary.navHome[currentLanguage]}
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/contacts"
          className={({ isActive }) => (isActive ? scss.active : "")}>
          {langDictionary.navContacts[currentLanguage]}
        </NavLink>
      )}
    </nav>
  );
};
