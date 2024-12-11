import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { langDictionary } from "../redux/language/constans";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import scss from "./ModalLibraries.module.scss";
interface ModalProps {
 closeModal: () => void;
 isModalLibrariesOpen: boolean;
}

// Komponent Modal w TypeScript
export function ModalLibraries({
 closeModal,
 isModalLibrariesOpen,
}: ModalProps) {
 const currentLanguage = useSelector(selectLanguage);

 useEffect(() => {
  window.addEventListener("keydown", handleEsc);

  return () => {
   window.removeEventListener("keydown", handleEsc);
  };
 }, []);

 const handleEsc = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
   closeModal();
  }
 };

 const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
  if (event.target === event.currentTarget) {
   closeModal();
  }
 };

 return (
  <div
   className={`${scss["modal-libraries-overlay"]} ${isModalLibrariesOpen ? scss["is-open"] : ""} `}
   onClick={handleClickOutside}>
   <div className={scss["modal"]}>
    <p className={scss["modal-libraries-title"]}>
     {langDictionary.modalLibraries[currentLanguage]}
    </p>
    <ul className={scss["container-unnumbered-list"]}>
     <li>
      <a
       href="https://react-icons.github.io/react-icons/"
       target="_blank"
       rel="noopener noreferrer">
       React
      </a>
     </li>
     <li>
      <a
       href="https://axios-http.com/docs/intro"
       target="_blank"
       rel="noopener noreferrer">
       Axios
      </a>
     </li>
     <li>
      <a
       href="https://redux-toolkit.js.org/introduction/getting-started"
       target="_blank"
       rel="noopener noreferrer">
       Redux Toolkit
      </a>
     </li>
     <li>
      <a
       href="https://github.com/rt2zz/redux-persist#readme"
       target="_blank"
       rel="noopener noreferrer">
       Redux Persist
      </a>
     </li>
     <li>
      <a
       href="https://github.com/staylor/react-helmet-async/tree/main"
       target="_blank"
       rel="noopener noreferrer">
       React Helmet Async
      </a>
     </li>
     <li>
      <a
       href="https://react-hot-toast.com/"
       target="_blank"
       rel="noopener noreferrer">
       React Hot Tost
      </a>
     </li>
     <li>
      <a
       href="https://react-icons.github.io/react-icons/"
       target="_blank"
       rel="noopener noreferrer">
       React Icons
      </a>
     </li>
     <li>
      <a
       href="https://mhnpd.github.io/react-loader-spinner/docs/intro"
       target="_blank"
       rel="noopener noreferrer">
       React Loader Spinner
      </a>
     </li>
     <li>
      <a
       href="https://www.fusejs.io/"
       target="_blank"
       rel="noopener noreferrer">
       Fuse.js
      </a>
     </li>
    </ul>
   </div>
  </div>
 );
}
