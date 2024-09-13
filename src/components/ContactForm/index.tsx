import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { addContact } from "../redux/contacts/operations";
import { selectContacts } from "../redux/contacts/selectors";
import { AppDispatch } from "../redux/store";
import scss from "./ContactForm.module.scss";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
import toast from "react-hot-toast";

interface ContactToAdd {
  name: string;
  number: string;
}

const ContactForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(selectContacts);
  const currentLanguage = useSelector(selectLanguage);

  const [contactToAdd, setContactToAdd] = useState<ContactToAdd>({
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

  const handleInputChange = (field: keyof ContactToAdd, value: string) => {
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
        existingContact.name === newName ||
        existingContact.number === newNumber,
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
  };

  const isInputsValid = () => {
    return contactToAdd.name && contactToAdd.number;
  };

  const nameId = nanoid();
  const numId = nanoid();

  return (
    <li className={scss["contact-form-item"]}>
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
              handleInputChange(
                e.target.name as keyof ContactToAdd,
                e.target.value,
              )
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
              handleInputChange(
                e.target.name as keyof ContactToAdd,
                e.target.value,
              )
            }
            required
          />
        </span>
        <span>
          <button
            onClick={(e) => handleAddContact(e)}
            disabled={!isInputsValid()}>
            {langDictionary.tableButtonAddContact[currentLanguage]}
          </button>
        </span>
        <span>
          <button onClick={handleCancel}>
            {langDictionary.tableButtonCancel[currentLanguage]}
          </button>
        </span>
      </form>
    </li>
  );
};

export default ContactForm;
