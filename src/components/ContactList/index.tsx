import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVisibleContacts } from "../redux/contacts/selectors";
import { editContact as editContactAction } from "../redux/contacts/operations";
import { AppDispatch } from "../redux/store";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
import { Contact } from "../Interface/Interface";
import ContactForm from "../ContactForm";
import SeparateContact from "../SeparateContact/index";
import scss from "./ContactList.module.scss";

const ContactList: React.FC = () => {
 const dispatch = useDispatch<AppDispatch>();
 const filteredContacts = useSelector(selectVisibleContacts);
 const currentLanguage = useSelector(selectLanguage);

 const sortedContacts = filteredContacts.sort((a, b) =>
  a.name.localeCompare(b.name),
 );

 const handleEditContact = (updatedContact: Contact) => {
  dispatch(editContactAction(updatedContact));
  console.log("Contact updated:", updatedContact);
 };

 return (
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
 );
};

export default ContactList;
