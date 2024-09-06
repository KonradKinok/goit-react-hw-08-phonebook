import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchContacts } from "../redux/contacts/operations";
import { selectError, selectIsLoading } from "../redux/contacts/selectors";
import ContactForm from "../ContactForm/index";
import Filter from "../Filter/index";
import ContactList from "../ContactList/index";
import scss from "./Phonebook.module.scss";

export function Contacts() {
     const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);
    
    // const { isLoading, error } = useSelector((state: RootState) => state.contacts);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
console.log(error)
    return (
        <div className={scss.phonebookContainer}>
            <h1>Phonebook</h1>
            <ContactForm />
            <h2>Contacts</h2>
            <Filter />
            {error?(<div>{error}</div>):
            isLoading ?(<div>Loading...</div>)
            :<ContactList />}
        </div>
    );
};