import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVisibleContacts } from "../redux/contacts/selectors";
import { editContact as editContactAction } from "../redux/contacts/operations";
import SeparateContact from "../SeparateContact/index";
import { AppDispatch } from "../redux/store";
import scss from "./ContactList.module.scss";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
interface Contact {
  id: string;
  name: string;
  number: string;
}

const ContactList: React.FC = () => {
  const filteredContacts = useSelector(selectVisibleContacts);
  const sortedContacts = filteredContacts.sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector(selectLanguage);
  const handleEditContact = (updatedContact: Contact) => {
    dispatch(editContactAction(updatedContact));
    console.log("Contact updated:", updatedContact);
  };

  return (
    <>
      <div className={scss["tbl-content"]}>
        <table className={`${scss["second-table"]} `}>
          <thead className={scss["tbl-header"]}>
            <tr>
              <th>{langDictionary.tableId[currentLanguage]}</th>
              <th>{langDictionary.tableName[currentLanguage]}</th>
              <th>{langDictionary.tableNumber[currentLanguage]}</th>
              <th colSpan={2}>{langDictionary.tableAction[currentLanguage]}</th>
            </tr>
          </thead>
          <tbody>
            {sortedContacts.map((contact: Contact, index: number) => (
              <SeparateContact
                index={index}
                key={contact.id}
                contact={contact}
                editContact={handleEditContact}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ContactList;
