import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVisibleContacts } from "../redux/contacts/selectors";
import { editContact as editContactAction } from "../redux/contacts/operations";
import SeparateContact from "../SeparateContact/index";
import { AppDispatch } from "../redux/store";
import scss from "./ContactList.module.scss";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
import ContactForm from "../ContactForm";
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
      <div className={scss["contact-list-content"]}>
        <ul className={scss["contact-list"]}>
          <li className={scss["list-header"]}>
            <form className={scss["list-first-child"]}>
              <span className={scss["span-title"]}>
                {langDictionary.tableId[currentLanguage]}
              </span>
              <span className={scss["span-title"]}>
                {langDictionary.tableName[currentLanguage]}
              </span>
              <span className={scss["span-title"]}>
                {langDictionary.tableNumber[currentLanguage]}
              </span>
              <span className={scss["span-title"]}>
                {langDictionary.tableAction[currentLanguage]}
              </span>
            </form>
          </li>
          <ContactForm />
          {sortedContacts.map((contact: Contact, index: number) => (
            <SeparateContact
              index={index}
              key={contact.id}
              contact={contact}
              editContact={handleEditContact}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ContactList;
