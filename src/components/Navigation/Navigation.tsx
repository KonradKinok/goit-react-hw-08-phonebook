import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuthUser } from "../hooksUser";
import { AuthUser } from "../Interface/Interface";
import { AppDispatch } from "../redux/store";
import { setLanguage } from "../redux/language/sliceLanguage";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { Languages, langDictionary } from "../redux/language/constans";
import scss from "./Navigation.module.scss";

interface NavigationProps {
 onLinkClick?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onLinkClick }) => {
 const dispatch = useDispatch<AppDispatch>();
 const { isLoggedIn }: AuthUser = useAuthUser();
 const currentLanguage = useSelector(selectLanguage);

 const handleChangeLanguage = () => {
  const newLanguage =
   currentLanguage === Languages.EN ? Languages.PL : Languages.EN;
  dispatch(setLanguage(newLanguage));
  if (onLinkClick) onLinkClick();
 };

 return (
  <nav className={scss["nav-navigation"]}>
   <a className={scss["lang"]} onClick={handleChangeLanguage}>
    {currentLanguage}
   </a>
   <NavLink
    to="/"
    className={({ isActive }) => (isActive ? scss.active : "")}
    onClick={onLinkClick}>
    {langDictionary.navHome[currentLanguage]}
   </NavLink>
   {isLoggedIn && (
    <NavLink
     to="/contacts"
     className={({ isActive }) => (isActive ? scss.active : "")}
     onClick={onLinkClick}>
     {langDictionary.navContacts[currentLanguage]}
    </NavLink>
   )}
  </nav>
 );
};
