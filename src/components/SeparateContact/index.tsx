import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AppDispatch } from "../redux/store";
import { deleteContact } from "../redux/contacts/operations";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";

interface Contact {
 id: string;
 name: string;
 number: string;
}

interface SeparateContactProps {
 contact: Contact;
 index: number;
 editContact: (contact: Contact) => void;
}

const SeparateContact: React.FC<SeparateContactProps> = ({
 contact,
 index,
 editContact,
}) => {
 const dispatch = useDispatch<AppDispatch>();
 const handleDelete = () => dispatch(deleteContact(contact.id));
 const currentLanguage = useSelector(selectLanguage);

 const [editId, setEditId] = useState<string | null>(null);
 const [editedContact, setEditedContact] = useState<Contact>(contact);
 const [originalContact, setOriginalContact] = useState<Contact>(contact);

 const isValidPhoneNumber = (phoneNumber: string) => {
  const regex = /^(\+?[0-9]+(-[0-9]+)*)?$/;
  return regex.test(phoneNumber);
 };

 const handleInputChange = (field: keyof Contact, value: string) => {
  if (field === "number" && !isValidPhoneNumber(value)) {
   const errorMessage = langDictionary.errorPhoneNumberRegex[
    currentLanguage
   ].replace("{value}", value.slice(-1));

   toast.error(errorMessage, {
    position: "top-center",
    duration: 4000,
   });
   return;
  }
  setEditedContact((prevContact) => ({ ...prevContact, [field]: value }));
 };

 const handleEditClick = () => {
  if (editId === contact.id) {
   editContact(editedContact);
   setEditId(null);
  } else {
   setEditId(contact.id);
   setOriginalContact(contact);
  }
 };

 const handleCancelClick = () => {
  setEditedContact(originalContact);
  setEditId(null);
 };

 const isButtonSaveEnabled = () => {
  return editedContact.name && editedContact.number;
 };

 return (
  <li key={contact.id}>
   <form>
    <span>{String(index + 1).padStart(2, "0")}.</span>
    <span>
     {editId === contact.id ? (
      <input
       type="text"
       name="name"
       value={editedContact.name}
       disabled={editId !== contact.id}
       onChange={(e) =>
        handleInputChange(e.target.name as keyof Contact, e.target.value)
       }
       required
      />
     ) : (
      <span>{editedContact.name}</span>
     )}
    </span>
    <span>
     {editId === contact.id ? (
      <input
       type="tel"
       name="number"
       value={editedContact.number}
       onChange={(e) =>
        handleInputChange(e.target.name as keyof Contact, e.target.value)
       }
       required
      />
     ) : (
      <a href={`tel:${editedContact.number}`}>{editedContact.number}</a>
     )}
    </span>
    <span>
     {editId === contact.id ? (
      <>
       <button
        type="button"
        name="editSave"
        disabled={!isButtonSaveEnabled()}
        onClick={handleEditClick}>
        {langDictionary.tableButtonSave[currentLanguage]}
       </button>
       <button type="button" name="editCancel" onClick={handleCancelClick}>
        {langDictionary.tableButtonCancel[currentLanguage]}
       </button>
      </>
     ) : (
      <button type="button" name="editEdit" onClick={handleEditClick}>
       {langDictionary.tableButtonEdit[currentLanguage]}
      </button>
     )}
    </span>
    <span>
     <button type="button" onClick={handleDelete}>
      {langDictionary.tableButtonDelete[currentLanguage]}
     </button>
    </span>
   </form>
  </li>
 );
};

export default SeparateContact;
