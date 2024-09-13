import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { setStatusFilter } from "../redux/contacts/filtersSlice";
import scss from "./Filter.module.scss";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage);
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value;
    dispatch(setStatusFilter(filter));
  };

  const searchId = nanoid();
  return (
    <div className={scss["container-filter"]}>
      <input
        type="text"
        id={searchId}
        name="filter"
        placeholder={langDictionary.findContact[currentLanguage]}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
