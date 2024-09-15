import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoLibrary } from "react-icons/io5";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
import { ModalLibraries } from "../ModalLibraries/ModalLibraries";
import footerLogoImage from "../../images/footer/konikMaly24x24Squoosh.png";
import footerLogoText from "../../images/footer/3KLogo.png";
import scss from "./Footer.module.scss";

export const Footer: React.FC = () => {
 const currentLanguage = useSelector(selectLanguage);
 const [isModalLibrariesOpen, setIsModalLibrariesOpen] =
  useState<boolean>(false);

 const handleMenuMobileModalOpen = () => {
  setIsModalLibrariesOpen((prevState) => !prevState);
 };

 return (
  <footer className={scss["footer"]}>
   <div className={scss["footer-container"]}>
    <div className={scss["footer-logo"]}>
     <img src={footerLogoImage} alt="logoImage" width="24" />
     <img src={footerLogoText} alt="logoText" />
    </div>
    <div
     className={scss["footer-libraries"]}
     onClick={handleMenuMobileModalOpen}>
     <IoLibrary size={32} />
     <small>{langDictionary.footerLibraries[currentLanguage]}</small>
    </div>
   </div>
   <div className={scss["footer-date"]}>
    <p>15.09.2024</p>
   </div>
   {isModalLibrariesOpen && (
    <ModalLibraries closeModal={handleMenuMobileModalOpen} />
   )}
  </footer>
 );
};
