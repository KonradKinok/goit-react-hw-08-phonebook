import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import scss from "./RegisterPage.module.scss";
export default function Register() {
  return (
    <HelmetProvider>
      <div className={scss["container-register-form"]}>
        <Helmet>
          <title>Registration</title>
        </Helmet>
        <RegisterForm />
      </div>
    </HelmetProvider>
  );
}
