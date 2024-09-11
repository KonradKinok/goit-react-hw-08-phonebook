import React from "react";
import footerLogoText from "../../images/footer/3KLogo.png";
import footerLogoImage from "../../images/footer/konikMaly24x24Squoosh.png";
import style from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className={style["footer-logo"]}>
        <img src={footerLogoImage} alt="logoImage" width="24" />
        <img src={footerLogoText} alt="logoText" />
      </div>
      <div itemID="footer-title">
        <p></p>
      </div>
      <div className={style["footer-date"]}>
        <p>12.09.2024</p>
      </div>
    </footer>
  );
};
