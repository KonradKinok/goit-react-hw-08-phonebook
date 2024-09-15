import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/authUser/operationsUser.auth";
import { useAuthUser } from "../hooksUser";
import { AppDispatch } from "../redux/store";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
import scss from "./UserMenu.module.scss";
interface UserMenuProps {
 onLinkClick?: () => void; // Opcjonalny prop
}
export const UserMenu: React.FC<UserMenuProps> = ({ onLinkClick }) => {
 const dispatch: AppDispatch = useDispatch();
 const { user } = useAuthUser();
 const currentLanguage = useSelector(selectLanguage);

 const handleLogOut = () => {
  dispatch(logOut());
  if (onLinkClick) onLinkClick();
 };

 return (
  <div className={scss["header-container-user-menu"]}>
   <small className={scss.username}>
    {langDictionary.navWelcome[currentLanguage]}, {user.name}
   </small>
   <a onClick={handleLogOut}>{langDictionary.navLogOut[currentLanguage]}</a>
  </div>
 );
};
