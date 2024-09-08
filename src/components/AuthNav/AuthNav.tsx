import React from "react";
import { NavLink } from "react-router-dom";
import scss from "./AuthNav.module.scss";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { Languages, langDictionary } from "../redux/language/constans";
import { useSelector } from "react-redux";
export const AuthNav: React.FC = () => {
  const { nav, pLanguage, active } = scss;
  const currentLanguage = useSelector(selectLanguage);
  return (
    <div className={scss.nav}>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? active : "")}>
        {langDictionary.navRegister[currentLanguage]}
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? active : "")}>
        {langDictionary.navLogIn[currentLanguage]}
      </NavLink>
    </div>
  );
};
