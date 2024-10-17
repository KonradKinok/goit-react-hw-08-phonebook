import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { addContact } from "../redux/contacts/operations";
import { selectContacts } from "../redux/contacts/selectors";
import { AppDispatch } from "../redux/store";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
import { AddContact } from "../Interface/Interface";
import { FaUserPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
const ContactForm: React.FC = () => {
 const dispatch = useDispatch<AppDispatch>();
 const contacts = useSelector(selectContacts);
 const currentLanguage = useSelector(selectLanguage);
 const [contactToAdd, setContactToAdd] = useState<AddContact>({
  name: "",
  number: "",
 });

 const handleCancel = () => {
  setContactToAdd({ name: "", number: "" });
 };

 const isValidPhoneNumber = (phoneNumber: string) => {
  const regex = /^(\+?[0-9]+(-[0-9]+)*)?$/;
  return regex.test(phoneNumber);
 };

 const handleInputChange = (field: keyof AddContact, value: string) => {
  if (field === "number" && !isValidPhoneNumber(value)) {
   const errorMessage = langDictionary.errorPhoneNumberRegex[
    currentLanguage
   ].replace("{value}", value);

   toast.error(errorMessage, {
    position: "top-center",
    duration: 4000,
   });
   return;
  }
  setContactToAdd((prevContact) => ({ ...prevContact, [field]: value }));
 };

 const handleAddContact = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  const newName = contactToAdd.name;
  const newNumber = contactToAdd.number;

  const contactExists = contacts.some(
   (existingContact) =>
    existingContact.name === newName || existingContact.number === newNumber,
  );

  if (contactExists) {
   const errorMessage = langDictionary.errorRepeatedContact[currentLanguage]
    .replace("{name}", newName)
    .replace("{number}", newNumber);

   toast.error(errorMessage, {
    position: "top-center",
    duration: 4000,
   });
   return;
  }

  dispatch(addContact({ name: newName, number: newNumber }));
  setContactToAdd({ name: "", number: "" });
  const addContactMessage = langDictionary.addContactMessage[currentLanguage]
   .replace("{name}", newName)
   .replace("{number}", newNumber);
  toast.success(addContactMessage);
 };

 const isInputsValid = () => {
  return contactToAdd.name && contactToAdd.number;
 };

 const nameId = nanoid();
 const numId = nanoid();

 return (
  <li>
   <form>
    <span>00.</span>
    <span>
     <input
      id={nameId}
      type="text"
      name="name"
      value={contactToAdd.name}
      placeholder={langDictionary.newName[currentLanguage]}
      onChange={(e) =>
       handleInputChange(e.target.name as keyof AddContact, e.target.value)
      }
      required
     />
    </span>
    <span>
     <input
      id={numId}
      type="tel"
      name="number"
      title="Only numbers"
      value={contactToAdd.number}
      placeholder={langDictionary.newNumber[currentLanguage]}
      onChange={(e) =>
       handleInputChange(e.target.name as keyof AddContact, e.target.value)
      }
      required
     />
    </span>
    <span>
     <button onClick={(e) => handleAddContact(e)} disabled={!isInputsValid()}>
      <FaUserPlus />
     </button>
    </span>
    <span>
     <button onClick={handleCancel}>
      <RxCross2 />
     </button>
    </span>
   </form>
  </li>
 );
};

export default ContactForm;
