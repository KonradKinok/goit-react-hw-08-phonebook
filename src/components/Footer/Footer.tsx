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

    <address>
     <ul>
      <li>
       <a href="mailto:3k.nexgen@gmail.com">3K.nexgen@gmail.com</a>
      </li>
     </ul>
    </address>
   </div>

   <ModalLibraries
    closeModal={handleMenuMobileModalOpen}
    isModalLibrariesOpen={isModalLibrariesOpen}
   />

   <div className={scss["footer-container-libraries-date"]}>
    <div
     className={scss["footer-libraries"]}
     onClick={handleMenuMobileModalOpen}>
     <IoLibrary size={32} />
     <small>{langDictionary.footerLibraries[currentLanguage]}</small>
    </div>
   </div>
  </footer>
 );
};
