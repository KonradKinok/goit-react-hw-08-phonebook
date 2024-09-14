import React from "react";
import scss from "./HomePage.module.scss";
import sadManImg from "../../images/homePage/phonbook-negative.jpg";
import happyManImg from "../../images/homePage/phonebook-positive.jpg";
import happyMan2Img from "../../images/homePage/phonebook-positive2.jpg";
import { selectLanguage } from "../../components/redux/language/selectorsLanguage";
import {
 Languages,
 langDictionary,
} from "../../components/redux/language/constans";
export default function HomePage() {
 return (
  <div className={scss["container-home-page"]}>
   <div className={scss["img-container-sadman"]}>
    <img className={scss["img"]} src={sadManImg} alt="a sad man" />
   </div>

   <div className={scss["img-container-happyman"]}>
    <img className={scss["img"]} src={happyManImg} alt="a happy man" />
   </div>
   <div>
    <p>
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit a quos
     blanditiis alias corrupti itaque esse id nam, maxime necessitatibus facere
     voluptatibus corporis dolorem, quaerat exercitationem facilis neque
     quisquam sed.
    </p>
   </div>
  </div>
 );
}
