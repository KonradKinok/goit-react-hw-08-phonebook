import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../redux/contacts/operations";
import { AppDispatch } from "../redux/store";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
import scss from "./SeparateContact.module.scss";

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
  // Handler do przechwytywania zmian w inputach
  const handleInputChange = (field: keyof Contact, value: string) => {
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
  return (
    <tr key={contact.id}>
      <td>{index + 1}.</td>
      <td>
        <input
          type="text"
          value={editedContact.name}
          disabled={editId !== contact.id} // input nieaktywny, gdy nie jest w trybie edycji
          onChange={(e) => handleInputChange("name", e.target.value)} // zarządzanie zmianami inputu
        />
      </td>
      <td>
        <input
          type="text"
          value={editedContact.number}
          disabled={editId !== contact.id} // input nieaktywny, gdy nie jest w trybie edycji
          onChange={(e) => handleInputChange("number", e.target.value)} // zarządzanie zmianami inputu
        />
      </td>
      <td>
        {editId === contact.id ? (
          <>
            <button onClick={handleEditClick}>
              {langDictionary.tableButtonSave[currentLanguage]}
            </button>
            <button onClick={handleCancelClick}>
              {langDictionary.tableButtonCancel[currentLanguage]}
            </button>
          </>
        ) : (
          <button onClick={handleEditClick}>
            {langDictionary.tableButtonEdit[currentLanguage]}
          </button>
        )}
      </td>
      <td>
        <button type="button" onClick={handleDelete}>
          {langDictionary.tableButtonDelete[currentLanguage]}
        </button>
      </td>
    </tr>
  );
};

export default SeparateContact;
