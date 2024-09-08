import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/authUser/operationsUser.auth";
import { useAuthUser } from "../hooksUser";
import scss from "./UserMenu.module.scss";
import { AppDispatch } from "../redux/store";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { Languages, langDictionary } from "../redux/language/constans";
export const UserMenu: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage);
  const { user } = useAuthUser();

  return (
    <div className={scss["header-container-user-menu"]}>
      <p className={scss.username}>
        {langDictionary.navWelcome[currentLanguage]}, {user.name}
      </p>
      <a onClick={() => dispatch(logOut())}>
        {langDictionary.navLogOut[currentLanguage]}
      </a>
    </div>
  );
};
