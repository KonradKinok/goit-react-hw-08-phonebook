import React, { FormEvent, useState } from "react";
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
  const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^(\+?[0-9]+(-[0-9]+)*)?$/;
    return regex.test(phoneNumber);
  };

  const handleInputChange = (field: keyof ContactToAdd, value: string) => {
    if (field === "number" && !isValidPhoneNumber(value)) {
      toast.error(`${field} or ${value} jest jakiś błąd`, {
        position: "top-center",
        duration: 4000,
      });
    } else {
      setContactToAdd((prevContact) => ({ ...prevContact, [field]: value }));
    }
  };

  const handleAddContact = () => {
    const newName = contactToAdd.name;
    const newNumber = contactToAdd.number;

    const contactExists = contacts.some(
      (existingContact) =>
        existingContact.name === newName ||
        existingContact.number === newNumber,
    );

    if (contactExists) {
      toast.error(`${newName} or ${newNumber} is already in contacts`, {
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
    <tr key={"addContact"}>
      <td>0.</td>
      <td>
        <input
          id={nameId}
          type="text"
          name="name"
          title="The name can only contain letters, including Polish letters, apostrophes, hyphens, and spaces."
          value={contactToAdd.name}
          onChange={(e) =>
            handleInputChange(
              e.target.name as keyof ContactToAdd,
              e.target.value,
            )
          } // zarządzanie zmianami inputu
          required
        />
      </td>
      <td>
        <input
          id={numId}
          type="tel"
          name="number"
          pattern="^\+?[0-9]+(-[0-9]+)*$"
          title="Only numbers and an optional leading +"
          value={contactToAdd.number}
          onChange={(e) =>
            handleInputChange(
              e.target.name as keyof ContactToAdd,
              e.target.value,
            )
          }
          required
        />
      </td>
      <td>
        <button onClick={handleAddContact} disabled={!isInputsValid()}>
          {langDictionary.tableButtonAddContact[currentLanguage]}
        </button>
      </td>
      <td>
        <button onClick={handleCancel}>
          {langDictionary.tableButtonCancel[currentLanguage]}
        </button>
      </td>
    </tr>
  );
  //   return (
  //     <>
  //       <form className={scss.form} onSubmit={handleSubmit}>
  //         <label htmlFor={nameId}>Name</label>
  // <input
  //   id={nameId}
  //   type="text"
  //   name="name"
  //   pattern="^[A-Za-zÀ-ÖØ-öø-ÿąćęłńóśźżĄĆĘŁŃÓŚŹŻ' -]+$"
  //   title="The name can only contain letters, including Polish letters, apostrophes, hyphens, and spaces."
  //   required
  // />
  //         <label htmlFor={numId}>Phone number</label>
  // <input
  //   id={numId}
  //   type="tel"
  //   name="number"
  //   pattern="^\+?\d*$"
  //   title="Only numbers and an optional leading +"
  //   required
  // />
  //         <button type="submit">Add contact</button>
  //       </form>
  //     </>
  //   );
};

export default ContactForm;
