import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../components/redux/store";
import { fetchContacts } from "../../components/redux/contacts/operations";
import {
  selectError,
  selectIsLoading,
} from "../../components/redux/contacts/selectors";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ContactForm from "../../components/ContactForm/index";
import Filter from "../../components/Filter";
import ContactList from "../../components/ContactList/index";
import scss from "./ContactsPage.module.scss";

function ContactsPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const { isLoading, error } = useSelector((state: RootState) => state.contacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  console.log(error);
  return (
    <HelmetProvider>
      <Helmet>
        <title>Your contacts</title>
      </Helmet>
      <div className={scss.phonebookContainer}>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        {error ? (
          <div>{error}</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          <ContactList />
        )}
      </div>
    </HelmetProvider>
  );
}

export default ContactsPage;
