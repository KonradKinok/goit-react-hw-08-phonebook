import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../redux/contacts/operations";
import { AppDispatch } from "../redux/store";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
import scss from "./SeparateContact.module.scss";
import toast from "react-hot-toast";

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

  const [editId, setEditId] = useState<string | null>(null); // śledzenie ID kontaktu w trybie edycji
  const [editedContact, setEditedContact] = useState<Contact>(contact); // lokalny stan dla edytowanego kontaktu
  const [originalContact, setOriginalContact] = useState<Contact>(contact);

  const isValidPhoneNumber = (phoneNumber: string) => {
    const regex = /^(\+?[0-9]+(-[0-9]+)*)?$/;
    return regex.test(phoneNumber);
  };
  // Handler do przechwytywania zmian w inputach
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

  // Handler do zarządzania trybem edycji/zapisu
  const handleEditClick = () => {
    if (editId === contact.id) {
      // Jeśli kliknięto "Save", wykonaj edycję i wyczyść tryb edycji
      editContact(editedContact); // Wywołanie funkcji editContact
      setEditId(null); // Reset trybu edycji
    } else {
      // Jeśli kliknięto "Edit", ustaw wiersz w tryb edycji
      setEditId(contact.id);
      setOriginalContact(contact); // Zachowaj oryginalny kontakt przed edycją
    }
  };

  // Handler do anulowania edycji
  const handleCancelClick = () => {
    setEditedContact(originalContact); // Przywróć oryginalny kontakt
    setEditId(null); // Reset trybu edycji
  };
  const isButtonSaveEnabled = () => {
    return editedContact.name && editedContact.number;
  };
  return (
    <li className={scss["contact-item"]} key={contact.id}>
      <form>
        <span>{String(index + 1).padStart(2, "0")}.</span>
        <span>
          <input
            type="text"
            name="name"
            value={editedContact.name}
            disabled={editId !== contact.id} // input nieaktywny, gdy nie jest w trybie edycji
            onChange={(e) =>
              handleInputChange(e.target.name as keyof Contact, e.target.value)
            } // zarządzanie zmianami inputu
            required
          />
        </span>
        <span>
          <input
            type="tel"
            name="number"
            value={editedContact.number}
            disabled={editId !== contact.id} // input nieaktywny, gdy nie jest w trybie edycji
            onChange={(e) =>
              handleInputChange(e.target.name as keyof Contact, e.target.value)
            } // zarządzanie zmianami inputu
            required
          />
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
              <button
                type="button"
                name="editCancel"
                onClick={handleCancelClick}>
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
