import React from "react";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../components/redux/language/selectorsLanguage";
import { langDictionary } from "../../components/redux/language/constans";
import sadManImg from "../../images/homePage/phonbook-negative.jpg";
import happyManImg from "../../images/homePage/phonebook-positive.jpg";
import scss from "./HomePage.module.scss";

export default function HomePage() {
 const currentLanguage = useSelector(selectLanguage);

 return (
  <div className={scss["container-home-page"]}>
   <div className={scss["img-container-sadman"]}>
    <img className={scss["img"]} src={sadManImg} alt="a sad man" />
   </div>
   <p
    className={scss["first-phrase-home-page"]}
    dangerouslySetInnerHTML={{
     __html: langDictionary.homePageFirstPhrase[currentLanguage],
    }}></p>
   <p
    className={scss["second-phrase-home-page"]}
    dangerouslySetInnerHTML={{
     __html: langDictionary.homePageSecondPhrase[currentLanguage],
    }}></p>
   <div className={scss["img-container-happyman"]}>
    <img className={scss["img"]} src={happyManImg} alt="a happy man" />
   </div>
  </div>
 );
}
