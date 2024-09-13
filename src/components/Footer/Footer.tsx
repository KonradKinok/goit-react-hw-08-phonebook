import React, { useState } from "react";
import footerLogoText from "../../images/footer/3KLogo.png";
import footerLogoImage from "../../images/footer/konikMaly24x24Squoosh.png";
import scss from "./Footer.module.scss";
import { ModalLibraries } from "../ModalLibraries/ModalLibraries";
import { IoLibrary } from "react-icons/io5";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { Languages, langDictionary } from "../redux/language/constans";
import { useSelector } from "react-redux";
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
        <p>12.09.2024</p>
      </div>
      {isModalLibrariesOpen && (
        <ModalLibraries closeModal={handleMenuMobileModalOpen} />
      )}
    </footer>
  );
};
