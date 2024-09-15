import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GiWhiteBook } from "react-icons/gi";
import { Navigation } from "../Navigation/Navigation";
import { UserMenu } from "../UserMenu/UserMenu";
import { AuthNav } from "../AuthNav/AuthNav";
import { useAuthUser } from "../hooksUser";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import scss from "./AppBar.module.scss";

export const AppBar: React.FC = () => {
 const { isLoggedIn } = useAuthUser();
 const currentLanguage = useSelector(selectLanguage);
 const [windowDimension, setWindowDimension] = useState<number | null>(null);

 useEffect(() => {
  setWindowDimension(window.innerWidth);
 }, []);

 useEffect(() => {
  function handleResize() {
   setWindowDimension(window.innerWidth);
  }

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
 }, []);

 const isMobile: boolean = windowDimension !== null && windowDimension < 700;

 return (
  <header className={scss["header"]}>
   <div className={scss.title}>
    <GiWhiteBook size={50} />
    <p>{langDictionary.navPhonebook[currentLanguage]}</p>
   </div>
   <div className={scss["container-appbar"]}>
    {isMobile ? (
     <MobileMenu />
    ) : (
     <>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
     </>
    )}
   </div>
  </header>
 );
};
