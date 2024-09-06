import React, { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { logIn } from "../redux/authUser/operationsUser.auth";
import scss from "./LoginForm.module.scss";
import { AppDispatch } from "../redux/store";

export const LoginForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
     dispatch(
        logIn({
          // email: emailRef.current.value,
          // password: passwordRef.current.value,
           email: formElements.email.value,
        password:formElements.password.value,
        }),
      );
    form.reset();
  };

  useEffect(() => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.defaultValue = "franekdolas@gmail.com";
      passwordRef.current.defaultValue = "franekdolas2024";
    }
  }, []);

  return (
    <form className={scss.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={scss.label}>
        Email
        <input type="email" name="email" ref={emailRef} />
      </label>
      <label className={scss.label}>
        Password
        <input type="password" name="password" ref={passwordRef} />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
};
