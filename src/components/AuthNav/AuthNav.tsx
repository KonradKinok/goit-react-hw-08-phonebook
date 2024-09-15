import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
import scss from "./AuthNav.module.scss";

interface AuthNavProps {
 onLinkClick?: () => void;
}

export const AuthNav: React.FC<AuthNavProps> = ({ onLinkClick }) => {
 const currentLanguage = useSelector(selectLanguage);

 return (
  <div className={scss.nav}>
   <NavLink
    to="/register"
    className={({ isActive }) => (isActive ? scss["active"] : "")}
    onClick={onLinkClick}>
    {langDictionary.navRegister[currentLanguage]}
   </NavLink>
   <NavLink
    to="/login"
    className={({ isActive }) => (isActive ? scss["active"] : "")}
    onClick={onLinkClick}>
    {langDictionary.navLogIn[currentLanguage]}
   </NavLink>
  </div>
 );
};
